import React, { useEffect } from 'react';
import FacebookLogin, {
  ReactFacebookFailureResponse,
  ReactFacebookLoginInfo,
} from 'react-facebook-login';
import FacebookIcon from '@material-ui/icons/Facebook';
import blue from '@material-ui/core/colors/blue';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../auth/context';
import { notifyError } from '../../utils';

interface FacebookOAuthProps {
  isSignUp?: boolean;
}

const fbAppId = process.env.REACT_APP_FB_APP_ID;
const xfbml = true;
const fbVersion = 'v8.0';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fbButton: {
      width: '100%',
      backgroundColor: blue[800],
      '&:hover': {
        backgroundColor: blue[900],
      },
    },
    fbButtonContainer: {
      width: '100%',
      margin: theme.spacing(2),
      '&>span': {
        width: '100%',
      },
    },
  }),
);

export const FacebookOAuth: React.FunctionComponent<FacebookOAuthProps> = ({
  isSignUp = false,
}) => {
  const { oauthLogin } = useAuthContext();
  const history = useHistory();
  const classes = useStyles();

  const onLogin = (userInfo: ReactFacebookLoginInfo): void => {
    if (oauthLogin) {
      oauthLogin(userInfo.accessToken, 'facebook')
        .then(() => {
          toast.info('Welcome from google!');
          return history.push('/');
        })
        .catch(notifyError);
    }
  };

  const onFailure = (error: ReactFacebookFailureResponse): void => {
    toast.error(error.status);
  };

  useEffect(() => {
    const { FB } = global;

    if (!FB) {
      return;
    }

    FB.init({
      appId: fbAppId || '',
      cookie: true,
      xfbml: true,
      version: fbVersion,
    });
  }, []);

  return (
    <div className={classes.fbButtonContainer}>
      <FacebookLogin
        appId={process.env.REACT_APP_FB_APP_ID || ''}
        autoLoad={false}
        fields="name"
        scope="public_profile,user_birthday,user_gender,user_photos,email,user_link"
        version={fbVersion.slice(1)}
        xfbml={xfbml}
        cookie
        language="en_US"
        callback={onLogin}
        onFailure={onFailure}
        textButton={isSignUp ? 'SignUp with Facebook' : 'LogIn with Facebook'}
        cssClass={clsx(
          classes.fbButton,
          'MuiButtonBase-root',
          'MuiButton-root',
          'MuiButton-contained',
          'MuiButton-containedPrimary',
        )}
        icon={<FacebookIcon />}
      />
    </div>
  );
};
