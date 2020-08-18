import React from 'react';
import { AbstractAPI } from '../api/abstract';
import { OAuthProvider } from '../../types';

export interface User {
  email: string;
  logo: string;
  firstName: string;
  lastName: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  token: string;
  setToken: Function;
  logout: Function;
  login?: (username: string, password: string) => Promise<string>;
  oauthLogin?: (accessToken: string, provider: OAuthProvider) => Promise<string>;
  api: AbstractAPI | undefined;
  user: User | null;
}

export const AuthContext = React.createContext<AuthContextValue>({
  isAuthenticated: false,
  token: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setToken: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
  api: undefined,
  user: {
    email: '',
    logo: '',
    firstName: '',
    lastName: '',
  },
});

export const useAuthContext = (): AuthContextValue => React.useContext(AuthContext);
