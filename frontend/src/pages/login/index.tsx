import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useAuthContext } from '../../components/auth/context';
import { Page } from '../../components/base-page/page';
import { FormContainer } from '../../components/form-container';

const loginValidationSchema = yup.object({
  username: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .required()
    .min(7),
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
        onSubmit={(...args) => {
          window.console.log(args);
          toast.info('Welcome');
          login();
          history.push('/');
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
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Page>
  );
};
