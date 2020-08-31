import { AxiosError, AxiosResponse } from 'axios';
import {
  RequestConfig,
  APIConfig,
  LoginRequest,
  UserResponse,
  TokenResponse,
  OAuthLoginRequest,
  StatusDetailResponse,
  SignUpRequest,
  TokenRequest,
  Chat,
  Paginated,
  Message,
  NewChatMessageRequest,
} from '../../types';

export abstract class AbstractAPI {
  public token: string;

  public onNotAuthorisedRequest: (error: AxiosError) => void;

  protected constructor(config: APIConfig) {
    this.token = config.token;
    this.onNotAuthorisedRequest = () => {
      console.log('onNotAuthorisedRequest');
    };
  }

  abstract apiCall<T>(requestConfig: RequestConfig): Promise<AxiosResponse<T>>;

  abstract refreshToken(request: TokenRequest): Promise<AxiosResponse<TokenResponse>>;

  abstract login(request: LoginRequest): Promise<AxiosResponse<TokenResponse>>;

  abstract signUp(request: SignUpRequest): Promise<AxiosResponse<StatusDetailResponse>>;

  abstract oauthLogin(request: OAuthLoginRequest): Promise<AxiosResponse<TokenResponse>>;

  abstract confirmEmail(key: string): Promise<AxiosResponse<StatusDetailResponse>>;

  abstract logout(): Promise<AxiosResponse<StatusDetailResponse>>;

  abstract getUser(): Promise<AxiosResponse<UserResponse>>;

  abstract getChats(): Promise<AxiosResponse<Paginated<[Chat]>>>;

  abstract getChat(chatId: string): Promise<AxiosResponse<Chat>>;

  abstract getMessages(chatId: string): Promise<AxiosResponse<Paginated<[Message]>>>;

  abstract createMessage(request: NewChatMessageRequest): Promise<AxiosResponse<Message>>;
}
