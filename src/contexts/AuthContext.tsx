import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";
import { User, AuthState } from "@/types";

interface AuthContextType extends AuthState {
  login: () => void;
  logout: () => void;
  handleCallback: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
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
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL ||
          "https://reposcribe-1.onrender.com";
        // call backend to validate token and return user
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
      localStorage.removeItem("accessToken");
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: "Failed to check authentication status",
      });
    }
  };

  const login = () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://reposcribe-1.onrender.com";
    const redirectUri = `${window.location.origin}/auth/callback`;
    // redirect to backend-managed oauth entrypoint
    const loginUrl = `${baseUrl}/auth/github/login?redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;
    window.location.href = loginUrl;
  };

  const handleCallback = async (code: string) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      const baseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://reposcribe-1.onrender.comm";
      // backend will exchange the code for the GitHub token and return app access token + user
      const response = await axios.get(`${baseUrl}/auth/github/callback`, {
        params: {
          code,
          redirect_uri: `${window.location.origin}/auth/callback`,
        },
      });

      const { accessToken, user } = response.data;

      // Store the access token
      localStorage.setItem("accessToken", accessToken);

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
        error: "Failed to complete authentication",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
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
