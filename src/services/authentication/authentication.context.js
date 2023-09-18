// authentication.context.js
import React, { createContext, useState, useContext } from "react";
import { register, login, logout } from "./authentication.service";
import { getToken, saveToken, removeToken } from "./token.service";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const authenticate = async (username, password) => {
    const response = await login(username, password);

    if (response.token) {
      setIsAuthenticated(true);
      setUser(response.user);
      saveToken(response.token);
    }
  };

  const signup = async (name, email, matno, password, passwordConfirmed) => {
    const userData = {
      name,
      email,
      matno,
      password,
      passwordConfirmed,
    };

    const response = await register(userData);

    if (response.token) {
      setIsAuthenticated(true);
      setUser(response.user);
      saveToken(response.token);
    }
  };

  const signOut = async () => {
    const token = await getToken();

    const response = await logout(token);

    if (response) {
      setIsAuthenticated(false);
      setUser(null);
      removeToken();
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        setIsAuthenticated,
        setUser,
        setToken,
        authenticate,
        signup,
        signOut,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};
