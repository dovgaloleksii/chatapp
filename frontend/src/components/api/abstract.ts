import { AxiosResponse } from 'axios';
import {
  RequestConfig,
  APIConfig,
  LoginRequest,
  UserResponse,
  TokenResponse,
  OAuthLoginRequest,
  StatusDetailResponse,
  SignUpRequest,
} from '../../types';

export abstract class AbstractAPI {
  public token: string;

  protected constructor(config: APIConfig) {
    this.token = config.token;
  }

  abstract apiCall(requestConfig: RequestConfig): Promise<AxiosResponse>;

  abstract login(request: LoginRequest): Promise<AxiosResponse<TokenResponse>>;

  abstract signUp(request: SignUpRequest): Promise<AxiosResponse<StatusDetailResponse>>;

  abstract oauthLogin(request: OAuthLoginRequest): Promise<AxiosResponse<TokenResponse>>;

  abstract confirmEmail(key: string): Promise<AxiosResponse<StatusDetailResponse>>;

  abstract logout(): Promise<AxiosResponse<StatusDetailResponse>>;

  abstract getUser(): Promise<AxiosResponse<UserResponse>>;
}
