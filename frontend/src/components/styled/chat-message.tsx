import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Message, User } from '../../types';

interface ChatMessageInterface {
  message: Message;
  author: User;
}

export const ChatMessage: React.FunctionComponent<ChatMessageInterface> = ({ message, author }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={`${author?.first_name} ${author?.last_name}`} src={author?.logo} />
      </ListItemAvatar>
      <ListItemText
        color="initial"
        primary={`${author?.first_name} ${author?.last_name}`}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              {message.text}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};
