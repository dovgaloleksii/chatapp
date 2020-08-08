import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import { Page } from './components/base-page/page';
import { MainRouter } from './router';
import './app.scss';

export const App: React.FunctionComponent = () => (
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Router>
        <Page pageTitle="Chat app">
          <MainRouter />
        </Page>
      </Router>
    </ThemeProvider>
  </>
);
