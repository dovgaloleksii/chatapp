import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { AxiosError } from 'axios';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { useAuthContext } from '../../components/auth/context';
import { Page } from '../../components/base-page/page';
import { FormContainer } from '../../components/form-container';
import { FacebookOAuth } from '../../components/oauth/facebook';
import { GoogleOAuth } from '../../components/oauth/google';
import { LoginRequest } from '../../types';
import { notifyError } from '../../utils';
import { LinkBehavior } from '../../components/styled/link';

const loginValidationSchema = yup.object({
  username: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .required()
    .min(8),
});

type Login = yup.InferType<typeof loginValidationSchema>;

const initialValues: Login = {
  username: '',
  password: '',
};

export const Login: React.FunctionComponent = () => {
  const { login } = useAuthContext();
  const history = useHistory();

  return (
    <Page pageTitle="Login">
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          const { username, password } = values as LoginRequest;

          return login
            ? login(username, password)
                .then(() => {
                  toast.info('Welcome');
                  setSubmitting(false);
                  return history.push('/');
                })
                .catch((error: AxiosError) => {
                  setSubmitting(false);
                  notifyError(error, setFieldError);
                })
            : setSubmitting(false);
        }}
      >
        {({ handleReset, handleSubmit }) => (
          <Form onSubmit={handleSubmit} onReset={handleReset}>
            <FormContainer>
              <Typography align="center" variant="h5">
                Login
              </Typography>
              <Field
                component={TextField}
                name="username"
                label="Username"
                variant="outlined"
                autoComplete="current-username"
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
              <FacebookOAuth />
              <GoogleOAuth />
              <Divider className="w-100" />
              <Grid item xs={12} container justify="center">
                <Link component={LinkBehavior} href="/signup/">
                  <Typography variant="body2">Sign Up for an account</Typography>
                </Link>
              </Grid>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Page>
  );
};
