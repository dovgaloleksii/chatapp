import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';
import Lock from '@material-ui/icons/Lock';
import { toast } from 'react-toastify';
import { LinkBehavior } from '../../styled/link';
import { useAuthContext } from '../../auth/context';
import { WSClient } from '../../websocket';
import { Chat, Message } from '../../../types';
import { notifyError } from '../../../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);

export const UnAuthorisedDrawer: React.FunctionComponent = () => (
  <>
    <List>
      <ListItem component={Link} button to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem component={Link} button to="/login">
        <ListItemIcon>
          <Lock />
        </ListItemIcon>
        <ListItemText primary="Log in" />
      </ListItem>
    </List>
    <List>
      <ListItem component={Link} button to="/signup">
        <ListItemIcon>
          <Lock />
        </ListItemIcon>
        <ListItemText primary="Sign up" />
      </ListItem>
    </List>
  </>
);

interface AuthorisedDrawerProps {
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NewMessage {
  chat?: number;
  message?: Message;
  type?: string;
}

export const AuthorisedDrawer: React.FunctionComponent<AuthorisedDrawerProps> = React.memo(
  ({ setLoading }) => {
    const { api, isAuthenticated, token, user } = useAuthContext();
    const [chats, setChats] = React.useState<[Chat] | null>(null);
    const classes = useStyles();

    React.useEffect(() => {
      if (api) {
        api
          .getChats()
          .then(({ data }) => {
            setChats(data.results);
            return data;
          })
          .catch(notifyError);
      }
    }, [api]);

    React.useEffect(() => {
      if (isAuthenticated && setLoading) {
        setLoading(true);
        WSClient.token = token;
        WSClient.connect((message) => {
          const messageData = JSON.parse(message.data) as NewMessage;
          if (user?.pk !== messageData.message?.author) {
            toast.dark(messageData.message?.text);
          }
        });
        WSClient.waitForSocketConnection(() => setLoading(false));
        return () => {
          WSClient.close();
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }, [isAuthenticated, token, setLoading, user]);

    return (
      <>
        {chats &&
          chats.map((chat) => {
            const filteredUsers = chat.chat_users.filter(({ user: { pk } }) => pk !== user?.pk);
            return (
              <React.Fragment key={chat.pk}>
                <ListItem
                  alignItems="flex-start"
                  component={LinkBehavior}
                  href={`/chat/${chat.pk}/`}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={
                        chat.is_one_to_one
                          ? `${filteredUsers[0]?.user?.first_name} ${filteredUsers[0]?.user?.last_name}`
                          : chat.name
                      }
                      src={chat.is_one_to_one ? filteredUsers[0]?.user?.logo : ''}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    color="initial"
                    primary={
                      chat.is_one_to_one
                        ? `${filteredUsers[0]?.user?.first_name} ${filteredUsers[0]?.user?.last_name}`
                        : chat.name
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {chat.last_message || <b>New chat</b>}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            );
          })}
      </>
    );
  },
);
