import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { storage } from '../../lib/storage';
import type { User, AuthResponse } from '../../types/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Hydrate from localStorage
    const savedToken = storage.getToken();
    const savedUser = storage.getUser();
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Set unauthorized handler
    api.setUnauthorizedHandler(() => {
      handleUnauthorized();
    });
  }, []);

  const handleUnauthorized = async () => {
    try {
      await refreshToken();
    } catch {
      await signOut();
      navigate('/signin');
    }
  };

  const signIn = async (email: string, password: string) => {
    const response = await api.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    setUser(response.user);
    setToken(response.jwt);
    storage.setToken(response.jwt);
    storage.setUser(response.user);
    if (response.refreshToken) {
      storage.setRefreshToken(response.refreshToken);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    const response = await api.post<AuthResponse>('/auth/signup', {
      email,
      password,
      name,
    });

    setUser(response.user);
    setToken(response.jwt);
    storage.setToken(response.jwt);
    storage.setUser(response.user);
    if (response.refreshToken) {
      storage.setRefreshToken(response.refreshToken);
    }
  };

  const signOut = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
    }
    
    setUser(null);
    setToken(null);
    storage.clearAuth();
  };

  const refreshToken = async () => {
    const refreshTokenValue = storage.getRefreshToken();
    const response = await api.post<{ jwt: string }>('/auth/refresh', {
      refreshToken: refreshTokenValue,
    });

    setToken(response.jwt);
    storage.setToken(response.jwt);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        signIn,
        signUp,
        signOut,
        refreshToken,
      }}
    >
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
