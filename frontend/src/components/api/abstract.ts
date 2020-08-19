import { AxiosResponse } from 'axios';
import {
  RequestConfig,
  APIConfig,
  LoginRequest,
  UserResponse,
  LoginResponse,
  OAuthLoginRequest,
  LogoutResponse,
} from '../../types';

export abstract class AbstractAPI {
  public token: string;

  protected constructor(config: APIConfig) {
    this.token = config.token;
  }

  abstract apiCall(requestConfig: RequestConfig): Promise<AxiosResponse>;

  abstract login(request: LoginRequest): Promise<AxiosResponse<LoginResponse>>;

  abstract oauthLogin(request: OAuthLoginRequest): Promise<AxiosResponse<LoginResponse>>;

  abstract logout(): Promise<AxiosResponse<LogoutResponse>>;

  abstract getUser(): Promise<AxiosResponse<UserResponse>>;
}
