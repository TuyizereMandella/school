import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = '/api';  // Updated to use the proxy configuration

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(response.data.data);
    } catch (err) {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      await checkAuthStatus();
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      return { success: false, error: err.response?.data?.error };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      await checkAuthStatus();
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      return { success: false, error: err.response?.data?.error };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 