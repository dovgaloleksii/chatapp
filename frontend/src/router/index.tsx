import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from '../pages/login';
import { PageNotFound } from '../pages/pageNotFound';
import { Landing } from '../pages/landing';
import { SignUp } from '../pages/signup';
import { ConfirmEmail } from '../pages/confirm-email';

export const MainRouter: React.FunctionComponent = () => (
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/confirm_email/:key/" exact component={ConfirmEmail} />
    <Route component={PageNotFound} />
  </Switch>
);
