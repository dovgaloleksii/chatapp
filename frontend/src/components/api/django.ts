import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AbstractAPI } from './abstract';
import {
  RequestConfig,
  APIConfig,
  LoginRequest,
  LoginResponse,
  UserResponse,
  OAuthLoginRequest,
  LogoutResponse,
} from '../../types';

export class DjangoAPI extends AbstractAPI {
  api: AxiosInstance;

  constructor(config: APIConfig) {
    super(config);

    const axiosConfig = {
      baseURL: process.env.REACT_APP_API_URL || '/',
      timeout: 1000,
      headers: {},
    };

    if (this.token) {
      axiosConfig.headers = {
        ...axiosConfig.headers,
        Authorization: `JWT ${config.token}`,
      };
    }

    this.api = axios.create(axiosConfig);
  }

  apiCall(requestConfig: RequestConfig): Promise<AxiosResponse> {
    return this.api.request(requestConfig);
  }

  login(request: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
    return this.apiCall({
      url: 'api/auth/token/',
      method: 'POST',
      data: request,
    });
  }

  logout(): Promise<AxiosResponse<LogoutResponse>> {
    return this.apiCall({
      url: 'api/auth/logout/',
      method: 'POST',
    });
  }

  oauthLogin(request: OAuthLoginRequest): Promise<AxiosResponse<LoginResponse>> {
    return this.apiCall({
      url: `api/auth/${request.provider}/`,
      method: 'POST',
      // eslint-disable-next-line @typescript-eslint/camelcase
      data: { access_token: request.accessToken },
    });
  }

  getUser(): Promise<AxiosResponse<UserResponse>> {
    return this.apiCall({
      url: 'api/auth/user/',
      method: 'GET',
    });
  }
}
