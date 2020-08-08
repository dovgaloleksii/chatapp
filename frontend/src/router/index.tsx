import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login } from '../pages/login';
import { PageNotFound } from '../pages/pageNotFound';
import { Landing } from '../pages/landing';

export const MainRouter: React.FunctionComponent = () => (
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route path="/login" exact component={Login} />
    <Route component={PageNotFound} />
  </Switch>
);
