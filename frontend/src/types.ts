export interface APIConfig {
  token: string;
}

export type OAuthProvider = 'google' | 'facebook';

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

export interface RequestConfig<T = unknown> {
  method: Method;
  url: string;
  data?: T;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface OAuthLoginRequest {
  accessToken: string;
  provider: OAuthProvider;
}

export interface LoginResponse {
  token: string;
}

export interface UserResponse {
  pk: number;
  username: string;
  email: string;
  logo: string;
  first_name: string;
  last_name: string;
}
