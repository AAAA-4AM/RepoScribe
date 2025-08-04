export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  private: boolean;
}

export interface User {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  email: string;
}

export interface Documentation {
  id: string;
  repository: Repository;
  content: string;
  generatedAt: string;
  status: 'generating' | 'completed' | 'error';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}
