import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from './theme';
import { MainRouter } from './router';
import './app.scss';
import { ProvideAuth } from './components/auth';

export const App: React.FunctionComponent = () => (
  <>
    <CssBaseline />
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <ThemeProvider theme={theme}>
      <Router>
        <ProvideAuth>
          <MainRouter />
        </ProvideAuth>
      </Router>
    </ThemeProvider>
  </>
);
