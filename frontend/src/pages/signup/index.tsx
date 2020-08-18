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
import { LoginRequest } from '../../types';

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
    .min(7),
});
type SignUpType = yup.InferType<typeof signUpValidationSchema>;

const initialValues: SignUpType = {
  username: '',
  firstName: '',
  lastName: '',
  password: '',
};

export const SignUp: React.FunctionComponent = () => {
  const { login } = useAuthContext();
  const history = useHistory();

  return (
    <Page pageTitle="SignUp">
      <Formik
        validationSchema={signUpValidationSchema}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          const { username, password } = values as LoginRequest;

          return login
            ? login(username, password)
                .then(() => {
                  toast.info('Welcome');
                  setSubmitting(false);
                  return history.push('/');
                })
                .catch((error: unknown) => {
                  setSubmitting(false);
                  toast.error(String(error));
                })
            : setSubmitting(false);
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
                label="Username"
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
              <Button color="primary" variant="contained" type="submit" fullWidth>
                SignUp
              </Button>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Page>
  );
};
