import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_access_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      // Use the token to get user details
      // Assuming there's an endpoint /users/me/ or similar, or decoding token
      // For now, let's try to get user info from a protected endpoint or just assume valid if token works
      // Ideally, backend should have /auth/users/me/ or /api/users/me/
      
      // Let's try to fetch a protected resource to verify token. 
      // If we don't have a /me endpoint, we might need to rely on the token presence 
      // AND fetching the user details if stored, or decoding the token.
      
      // But wait, the previous `api.ts` adds the token to headers.
      // Let's assume we can fetch the user details. 
      // If the backend doesn't have a specific "me" endpoint, we might have to just trust the token
      // or implement one.
      
      // Let's check if I can decode the token or if I should implement /me in backend.
      // User serializer has 'id', 'username', 'email', 'role'.
      
      // Let's try to implement a simple /users/me/ in backend if it doesn't exist?
      // Or just store user info in localStorage on login.
      
      const storedUser = localStorage.getItem('admin_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role === 'admin') {
           setUser(parsedUser);
           setIsAuthenticated(true);
        } else {
            // Not an admin
            logout();
        }
      }
    } catch (err) {
      console.error("Auth check failed", err);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/token/', { username, password });
      const { access, refresh } = response.data;
      
      // We need to decode the token or fetch user details to check role
      // Since we don't have a jwt decode library installed yet, 
      // and we don't have a explicit /me endpoint in the snippet I saw...
      // Let's fetch the user list filtering by username? No that's insecure/inefficient.
      
      // Actually, standard JWT usually contains user_id. 
      // But we need the ROLE.
      
      // Better approach: Store the token, then make a request to a protected endpoint that returns user info.
      // Or, modify the backend login response to return user info including role.
      // OR, simply assume for now and implement a /users/me endpoint quickly.
      
      localStorage.setItem('admin_access_token', access);
      localStorage.setItem('admin_refresh_token', refresh);
      
      // Hack: For now, let's assume we can't easily get the role without an endpoint.
      // I will add a /users/me/ endpoint to the backend in a moment.
      // It's the standard way.
      
      // So here I will call that endpoint.
      const userResponse = await api.get('/auth/me/'); 
      
      const userData = userResponse.data;
      
      if (userData.role !== 'admin') {
        throw new Error("Access denied. Admin privileges required.");
      }
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('admin_user', JSON.stringify(userData));
      
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Login failed');
      logout(); // Clean up if failed
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
    localStorage.removeItem('admin_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
