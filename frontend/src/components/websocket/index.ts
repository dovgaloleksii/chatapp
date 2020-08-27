import qs from 'query-string';
import { WS_SECURE, WS_URL } from '../../constants';

class WebSocketClient {
  static instance?: WebSocketClient | null = null;

  static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient();
    }
    return WebSocketClient.instance;
  }

  private socketRef?: WebSocket | null = null;

  public closed = false;

  protected recursionStep = 100;

  token = '';

  logger = (message: string): void => {
    console.log(`[WebSocketClient] ${message}`);
  };

  getWSUrl = (): string => {
    if (this.token) {
      return `${WS_SECURE}://${WS_URL}?${qs.stringify({ token: this.token })}`;
    }
    return `${WS_SECURE}://${WS_URL}`;
  };

  connect = (onMessage: (message: MessageEvent) => void): void => {
    this.closed = false;
    const url = this.getWSUrl();
    this.socketRef = new WebSocket(url);
    this.socketRef.addEventListener('open', () => {
      this.logger('WebSocket open');
    });

    this.socketRef.addEventListener('message', (e) => {
      onMessage(e);
    });

    this.socketRef.addEventListener('error', (e) => {
      this.logger(String(e));
    });

    this.socketRef.onclose = () => {
      if (!this.closed) {
        this.logger("WebSocket closed let's reopen");
        setTimeout(() => {
          this.connect(onMessage);
        }, this.recursionStep);
      }
    };
  };

  public close = (): void => {
    this.logger('WebSocket closed');
    this.closed = true;
    return this.socketRef?.close();
  };

  public state = (): number | undefined => this.socketRef?.readyState;

  waitForSocketConnection = (callback?: Function): void => {
    if (this.socketRef && !this.closed) {
      const recursion = this.waitForSocketConnection;
      setTimeout(() => {
        if (this.state() === 1) {
          this.logger('Connection is made');
          if (callback) {
            callback();
          }
        } else if (!this.closed) {
          this.logger('wait for connection...');
          recursion(callback);
        }
      }, this.recursionStep);
    }
  };
}

export const WSClient = WebSocketClient.getInstance();
