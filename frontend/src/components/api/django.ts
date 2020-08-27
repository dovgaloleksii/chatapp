import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { AbstractAPI } from './abstract';
import {
  RequestConfig,
  APIConfig,
  LoginRequest,
  TokenResponse,
  UserResponse,
  OAuthLoginRequest,
  StatusDetailResponse,
  SignUpRequest,
  TokenRequest,
} from '../../types';
import { BASE_URL } from '../../constants';

export class DjangoAPI extends AbstractAPI {
  api: AxiosInstance;

  inRefreshState = false;

  constructor(config: APIConfig) {
    super(config);

    const axiosConfig = {
      baseURL: BASE_URL,
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

  apiCall<T>(requestConfig: RequestConfig): Promise<AxiosResponse<T>> {
    return this.api.request(requestConfig).catch(async (error: AxiosError) => {
      if (error.response?.status === 401 && !this.inRefreshState) {
        this.inRefreshState = true;
        try {
          const {
            data: { token },
          } = await this.refreshToken({ token: this.token });
          this.token = token;
          return this.apiCall<T>(requestConfig);
        } catch (refreshError) {
          this.onNotAuthorisedRequest(refreshError);
          throw refreshError;
        } finally {
          this.inRefreshState = false;
        }
      } else {
        throw error;
      }
    });
  }

  refreshToken(request: TokenRequest): Promise<AxiosResponse<TokenResponse>> {
    return this.apiCall<TokenResponse>({
      url: 'api/auth/token/refresh/',
      method: 'POST',
      data: request,
    });
  }

  login(request: LoginRequest): Promise<AxiosResponse<TokenResponse>> {
    return this.apiCall<TokenResponse>({
      url: 'api/auth/token/',
      method: 'POST',
      data: request,
    });
  }

  signUp(request: SignUpRequest): Promise<AxiosResponse<StatusDetailResponse>> {
    return this.apiCall<StatusDetailResponse>({
      url: 'api/auth/registration/',
      method: 'POST',
      data: {
        email: request.username,
        // eslint-disable-next-line @typescript-eslint/camelcase
        first_name: request.firstName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        last_name: request.lastName,
        password1: request.password,
        password2: request.repeatPassword,
      },
    });
  }

  confirmEmail(key: string): Promise<AxiosResponse<StatusDetailResponse>> {
    return this.apiCall<StatusDetailResponse>({
      url: 'api/auth/registration/verify-email/',
      method: 'POST',
      data: {
        key,
      },
    });
  }

  logout(): Promise<AxiosResponse<StatusDetailResponse>> {
    return this.apiCall<StatusDetailResponse>({
      url: 'api/auth/logout/',
      method: 'POST',
    });
  }

  oauthLogin(request: OAuthLoginRequest): Promise<AxiosResponse<TokenResponse>> {
    return this.apiCall<TokenResponse>({
      url: `api/auth/${request.provider}/`,
      method: 'POST',
      // eslint-disable-next-line @typescript-eslint/camelcase
      data: { access_token: request.accessToken },
    });
  }

  getUser(): Promise<AxiosResponse<UserResponse>> {
    return this.apiCall<UserResponse>({
      url: 'api/auth/user/',
      method: 'GET',
    });
  }
}
