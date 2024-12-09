import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    const storedUser = localStorage.getItem('user');
    const isAdminString = localStorage.getItem('isAdmin');
    const isAdminValue = isAdminString === 'true'; // Convert to boolean
    if (storedToken) {
      setIsLoggedIn(true);
      setIsAdmin(isAdminValue);
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setToken(null);
    }
  }, []);

  const login = (newToken, adminStatus, userData) => {
    localStorage.setItem('jwtToken', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAdmin', adminStatus);
    setIsLoggedIn(true);
    setIsAdmin(adminStatus === true);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
