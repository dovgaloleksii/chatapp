import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import { AuthContext, User } from './context';
import { getApi } from '../api';
import { OAuthProvider } from '../../types';

const API_PROVIDER = 'django';

export const ProvideAuth: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState(localStorage.getItem('accessToken') || '');
  const isAuthenticated = Boolean(token);
  const [api, setApi] = React.useState(getApi(API_PROVIDER, { token }));
  const logout = React.useCallback(() => {
    setToken('');
    setUser(null);
    localStorage.removeItem('accessToken');
  }, []);

  const getUser = React.useCallback((): void => {
    if (api.token) {
      api
        .getUser()
        .then(({ data }) => {
          setUser({
            firstName: data.first_name,
            lastName: data.last_name,
            logo: data.logo,
            email: data.email,
          });
          return data;
        })
        .catch(toast.error);
    }
  }, [api]);

  const login = React.useCallback(
    (username: string, password: string) => {
      return api
        .login({
          username,
          password,
        })
        .then(({ data: { token: newToken } }) => {
          setToken(newToken);
          localStorage.setItem('accessToken', newToken);
          console.log(jwtDecode(newToken));
          return newToken;
        });
    },
    [api],
  );

  const oauthLogin = React.useCallback(
    (accessToken: string, provider: OAuthProvider) => {
      return api
        .oauthLogin({
          accessToken,
          provider,
        })
        .then(({ data: { token: newToken } }) => {
          setToken(newToken);
          localStorage.setItem('accessToken', newToken);
          console.log(jwtDecode(newToken));
          return newToken;
        });
    },
    [api],
  );

  useEffect(() => {
    if (token !== api.token) {
      setApi(getApi(API_PROVIDER, { token }));
    }
  }, [token, api]);

  useEffect(() => {
    if (api.token) {
      getUser();
    }
  }, [api, getUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        token,
        setToken,
        logout,
        login,
        oauthLogin,
        api,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
