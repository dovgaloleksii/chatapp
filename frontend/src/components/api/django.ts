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
  Chat,
  Paginated,
  Message,
  NewChatMessageRequest,
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

  getChats(): Promise<AxiosResponse<Paginated<[Chat]>>> {
    return this.apiCall<Paginated<[Chat]>>({
      url: '/api/chats/',
      method: 'GET',
    });
  }

  getChat(chatId: string): Promise<AxiosResponse<Chat>> {
    return this.apiCall<Chat>({
      url: `/api/chats/${chatId}/`,
      method: 'GET',
    });
  }

  getMessages(chatId: string): Promise<AxiosResponse<Paginated<[Message]>>> {
    return this.apiCall<Paginated<[Message]>>({
      url: `/api/chats/${chatId}/messages/`,
      method: 'GET',
    });
  }

  createMessage(request: NewChatMessageRequest): Promise<AxiosResponse<Message>> {
    return this.apiCall<Message>({
      url: `/api/chats/${request.chatId}/messages/`,
      method: 'POST',
      data: { author: request.author, text: request.message },
    });
  }
}
