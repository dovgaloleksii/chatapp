import React, { useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../components/auth/context';
import { Page } from '../../components/base-page/page';
import { FormContainer } from '../../components/form-container';
import { notifyError } from '../../utils';

export const ConfirmEmail: React.FunctionComponent = () => {
  const { api, isAuthenticated } = useAuthContext();
  const history = useHistory();
  const {
    params: { key },
  } = useRouteMatch();

  useEffect(() => {
    if (key) {
      // eslint-disable-next-line no-unused-expressions
      api
        ?.confirmEmail(key)
        .then(() => {
          toast.success('Email confirmed!');
          if (isAuthenticated) {
            history.push('/');
          } else {
            history.push('/login/');
          }
        })
        .catch((error) => {
          notifyError(error);
          history.push('/login/');
        });
    }
  }, [api, key, history, isAuthenticated]);

  return (
    <Page pageTitle="Confirm email">
      <FormContainer>
        <Grid container direction="column" alignItems="center">
          <Typography align="center" variant="h5">
            Start email confirmation
          </Typography>
          <CircularProgress color="secondary" className="m-t-30 m-b-30" />
        </Grid>
      </FormContainer>
    </Page>
  );
};
