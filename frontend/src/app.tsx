import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import { MainRouter } from './router';
import './app.scss';
import { ProvideAuth } from './components/auth';

export const App: React.FunctionComponent = () => (
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Router>
        <ProvideAuth>
          <MainRouter />
        </ProvideAuth>
      </Router>
    </ThemeProvider>
  </>
);
