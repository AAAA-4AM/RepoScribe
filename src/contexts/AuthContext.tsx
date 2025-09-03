import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import axios from 'axios';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: () => void;
  logout: () => void;
  handleCallback: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://reposcribe-lhhs.onrender.com';
        const response = await axios.get(`${baseUrl}/auth/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        const user = response.data;
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: 'Failed to check authentication status',
      });
    }
  };

  const login = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://reposcribe-lhhs.onrender.com';
    const redirectUri = `${window.location.origin}/auth/callback`;
    
    // Redirect to backend's GitHub OAuth endpoint
    window.location.href = `${baseUrl}/auth/github/login?redirect_uri=${encodeURIComponent(redirectUri)}`;
  };

  const handleCallback = async (code: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://reposcribe-lhhs.onrender.com';
      const response = await axios.post(`${baseUrl}/auth/github/callback`, {
        code,
        redirect_uri: `${window.location.origin}/auth/callback`
      });

      const { accessToken, user } = response.data;
      
      // Store the access token
      localStorage.setItem('accessToken', accessToken);
      
      setAuthState({
        isAuthenticated: true,
        user,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: 'Failed to complete authentication',
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        handleCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
