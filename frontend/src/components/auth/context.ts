import React from 'react';

interface User {
  firstName: string;
  lastName: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  token: string;
  setToken: Function;
  logout: Function;
  login: Function;
  user: User | null;
}

export const AuthContext = React.createContext<AuthContextValue>({
  isAuthenticated: false,
  token: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setToken: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: () => {},
  user: {
    firstName: '',
    lastName: '',
  },
});

export const useAuthContext = (): AuthContextValue => React.useContext(AuthContext);
