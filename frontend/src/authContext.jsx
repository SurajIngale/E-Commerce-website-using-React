import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    const isAdminString = localStorage.getItem('isAdmin');
    const isAdminValue = isAdminString === 'true'; // Convert to boolean
    if (storedToken) {
      setIsLoggedIn(true);
      setIsAdmin(isAdminValue);
      setToken(storedToken);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setToken(null);
    }
  }, []);

  const login = (newToken, adminStatus) => {
    localStorage.setItem('jwtToken', newToken);
    localStorage.setItem('isAdmin', adminStatus);
    setIsLoggedIn(true);
    setIsAdmin(adminStatus === true);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
