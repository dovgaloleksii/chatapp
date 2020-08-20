import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { GoogleIcon } from '../icons/google';
import { useAuthContext } from '../auth/context';
import { notifyError } from '../../utils';

interface GoogleOAuthProps {
  isSignUp?: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    GoogleButton: {
      backgroundColor: grey[100],
    },
  }),
);

export const GoogleOAuth: React.FunctionComponent<GoogleOAuthProps> = ({ isSignUp = false }) => {
  const classes = useStyles();
  const { oauthLogin } = useAuthContext();
  const history = useHistory();

  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline): void => {
    if (oauthLogin && 'accessToken' in response) {
      oauthLogin(response.accessToken, 'google')
        .then(() => {
          toast.info('Welcome from google!');
          return history.push('/');
        })
        .catch(notifyError);
    }
  };

  const onFailure = (error: string): void => {
    toast.error(error);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGlE_APP_ID || ''}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
      render={({ disabled, onClick }) => (
        <Button
          className={classes.GoogleButton}
          disabled={disabled}
          onClick={onClick}
          fullWidth
          variant="contained"
          color="inherit"
          startIcon={<GoogleIcon />}
        >
          {isSignUp ? 'SignUp with Google' : 'LogIn with Google'}
        </Button>
      )}
    />
  );
};
