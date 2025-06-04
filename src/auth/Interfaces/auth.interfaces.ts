export interface UserLoginPayload {
  id: number;
  email: string;
  role: string;
  permissions?: string[];
}

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  permissions: string[];
}

export interface RegisterDto {
  email: string;
  password: string;
  role?: string; 
}