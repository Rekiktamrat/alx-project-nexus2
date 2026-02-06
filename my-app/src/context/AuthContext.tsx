import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, role?: 'admin' | 'user') => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing token on mount
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        // Ideally, verify token with backend or decode it
        // For now, we assume if token exists, we are roughly authenticated. 
        // A real app would fetch user profile here.
        setIsAuthenticated(true);
        // We can decode the token to get basic user info if needed, or fetch from an endpoint like /api/auth/me/
        // Since we don't have a /me endpoint yet, we might need to rely on stored user info or add one.
        const storedUser = localStorage.getItem('user_info');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/token/', { username, password });
      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      setIsAuthenticated(true);
      
      // Since the login endpoint only returns tokens, we might want to decode the token or fetch user details.
      // For this MVP, we can assume the username is correct or decode the JWT if we had a library.
      // Let's mock the user object or fetch if we add a /me endpoint. 
      // For now, I'll store a basic user object.
      const userInfo: User = { id: 0, username, email: '', role: 'user' }; // Placeholder
      setUser(userInfo); 
      localStorage.setItem('user_info', JSON.stringify(userInfo));

    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string, role: 'admin' | 'user' = 'user') => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post('/auth/register/', { username, email, password, role });
      // Auto login after register? Or redirect to login.
      // Let's just resolve successfully.
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_info');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
