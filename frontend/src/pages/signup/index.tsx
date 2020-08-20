import React from 'react';
import { useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { AxiosError } from 'axios';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { useAuthContext } from '../../components/auth/context';
import { Page } from '../../components/base-page/page';
import { FormContainer } from '../../components/form-container';
import { SignUpRequest } from '../../types';
import { notifyError } from '../../utils';
import { FacebookOAuth } from '../../components/oauth/facebook';
import { GoogleOAuth } from '../../components/oauth/google';
import { LinkBehavior } from '../../components/styled/link';

const signUpValidationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .required()
    .min(8),
  repeatPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), ''], 'Passwords must match'),
});
type SignUpType = yup.InferType<typeof signUpValidationSchema>;

const initialValues: SignUpType = {
  username: '',
  firstName: '',
  lastName: '',
  password: '',
  repeatPassword: '',
};

export const SignUp: React.FunctionComponent = () => {
  const { api } = useAuthContext();
  const history = useHistory();

  return (
    <Page pageTitle="SignUp">
      <Formik
        validationSchema={signUpValidationSchema}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          const {
            username,
            firstName,
            lastName,
            password,
            repeatPassword,
          } = values as SignUpRequest;

          return api
            ?.signUp({
              username,
              firstName,
              lastName,
              password,
              repeatPassword,
            })
            .then(({ data: { detail } }) => {
              toast.info(detail);
              setSubmitting(false);
              return history.push('/');
            })
            .catch((error: AxiosError) => {
              setSubmitting(false);
              notifyError(error, setFieldError, {
                email: 'username',
                // eslint-disable-next-line @typescript-eslint/camelcase
                first_name: 'firstName',
                // eslint-disable-next-line @typescript-eslint/camelcase
                last_name: 'lastName',
                password1: 'password',
                password2: 'repeatPassword',
              });
            });
        }}
      >
        {({ handleReset, handleSubmit }) => (
          <Form onSubmit={handleSubmit} onReset={handleReset}>
            <FormContainer>
              <Typography align="center" variant="h5">
                SignUp
              </Typography>
              <Field
                component={TextField}
                name="username"
                label="Email"
                variant="outlined"
                fullWidth
              />
              <Field
                component={TextField}
                name="firstName"
                label="First name"
                variant="outlined"
                fullWidth
              />
              <Field
                component={TextField}
                name="lastName"
                label="Last name"
                variant="outlined"
                fullWidth
              />
              <Field
                component={TextField}
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                variant="outlined"
                fullWidth
              />
              <Field
                component={TextField}
                name="repeatPassword"
                label="Repeat password"
                type="password"
                autoComplete="new-password"
                variant="outlined"
                fullWidth
              />
              <Button color="primary" variant="contained" type="submit" fullWidth>
                SignUp
              </Button>
              <Typography align="center" variant="body1">
                OR
              </Typography>
              <FacebookOAuth isSignUp />
              <GoogleOAuth isSignUp />
              <Divider className="w-100" />
              <Grid item xs={12} container justify="center">
                <Link component={LinkBehavior} href="/login/">
                  <Typography variant="body2">Already have an account? Log In</Typography>
                </Link>
              </Grid>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Page>
  );
};
