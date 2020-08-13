import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useAuthContext } from '../../components/auth/context';
import { Page } from '../../components/base-page/page';

export const Login: React.FunctionComponent = () => {
  const { login } = useAuthContext();
  const history = useHistory();

  return (
    <Page pageTitle="Login">
      <Button
        color="primary"
        onClick={() => {
          login();
          history.push('/');
        }}
      >
        Login
      </Button>
    </Page>
  );
};
