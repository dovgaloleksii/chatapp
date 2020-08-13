import React from 'react';
import { AuthContext } from './context';

export const ProvideAuth: React.FunctionComponent = ({ children }) => {
  const [user] = React.useState(null);
  const [token, setToken] = React.useState('');
  const isAuthenticated = Boolean(token);

  const logout = React.useCallback(() => {
    setToken('');
  }, []);

  const login = React.useCallback(() => {
    setToken('rand-token');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        token,
        setToken,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
