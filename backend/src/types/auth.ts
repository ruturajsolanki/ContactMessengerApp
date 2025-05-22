export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    username: string;
  };
}

export interface AuthRequest extends Request {
  user?: {
    username: string;
  };
} 