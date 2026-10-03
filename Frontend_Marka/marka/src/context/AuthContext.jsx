import { createContext, useState, useEffect } from 'react';
import { login, register, getCurrentUser } from '../services/auth';
import { useQueryClient } from '@tanstack/react-query';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        // Ensure roles property exists
        if (parsedUser && !parsedUser.roles) {
          parsedUser.roles = ['USER']; // Default role
        }
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const loginUser = async (loginDto) => {
    try {
      const { token, user: userData } = await login(loginDto);
      // Ensure roles property exists
      if (userData && !userData.roles) {
        userData.roles = ['USER']; // Default role
      }
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const registerUser = async (registerDto) => {
    try {
      const { token, user: userData } = await register(registerDto);
      // Ensure roles property exists
      if (userData && !userData.roles) {
        userData.roles = registerDto.roles || ['USER']; // Use provided roles or default
      }
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    queryClient.clear();
  };

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" style={{ color: 'var(--subtle-gold)' }} role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};