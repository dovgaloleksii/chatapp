import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Paper } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useAuthContext } from '../../components/auth/context';
import { Page } from '../../components/base-page/page';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      width: 'unset',

      '&>div, &>button': {
        margin: theme.spacing(2),
      },
      '&>.MuiTypography-root': {
        flex: 1,
      },
    },
  }),
);

export const Login: React.FunctionComponent = () => {
  const { login } = useAuthContext();
  const history = useHistory();
  const classes = useStyles();

  return (
    <Page pageTitle="Login">
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(...args) => {
          window.console.log(args);
          toast.info('Welcome');
          login();
          history.push('/');
        }}
      >
        {({ handleReset, handleSubmit }) => (
          <Form onSubmit={handleSubmit} onReset={handleReset}>
            <Paper>
              <Grid container className={classes.root}>
                <Typography align="center" variant="h5">
                  Login
                </Typography>
                <Field
                  component={TextField}
                  name="username"
                  label="Username"
                  variant="outlined"
                  autoComplete="current-password"
                  fullWidth
                />
                <Field
                  component={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  fullWidth
                />
                <Button color="primary" variant="contained" type="submit" fullWidth>
                  Login
                </Button>
              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
    </Page>
  );
};
