import React, { createContext, useState, useContext, useEffect } from 'react';

// Tạo context
const AuthContext = createContext();

// Tạo provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Tạo hook để sử dụng context
export const useAuth = () => {
  return useContext(AuthContext);
};