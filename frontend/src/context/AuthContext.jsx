import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock check for existing session
    const mockToken = localStorage.getItem('zakazpro_mock_token');
    if (mockToken) {
      setIsAuthenticated(true);
      setUser({ email: 'admin@zakazpro.com', role: 'Business Admin', businessId: 'BIZ-8492-ZKP' });
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock validation
    if (email && password) {
      localStorage.setItem('zakazpro_mock_token', 'mock-jwt-token-' + Date.now());
      setIsAuthenticated(true);
      setUser({ email, role: 'Business Admin', businessId: 'BIZ-8492-ZKP' });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('zakazpro_mock_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
