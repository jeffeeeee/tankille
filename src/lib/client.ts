import { axios } from '../httpClient';

import { ClientOptions, LoginOptions, RefreshToken } from './../types/client.d';

class Client {
  token = '';
  refreshToken = '';

  options: ClientOptions = {
    device: 'Android SDK built for x86_64 (03280ceb8a5367a6)',
    userAgent: 'FuelFellow/3.6.2 (Android SDK built for x86_64; Android 9)',
  };

  headers: { [key: string]: string } = {
    'User-Agent': 'FuelFellow/3.6.2 (Android SDK built for x86_64; Android 9)',
    Host: 'api.tankille.fi',
    'Content-Type': 'application/json',
  };

  constructor(options?: ClientOptions) {
    if (!options) return;
    this.options = options;
    this.token = options.token;
    this.refreshToken = options.refreshToken;
    if (!this.options.userAgent) return;
    this.headers = {
      'User-Agent': this.options.userAgent,
    };
  }

  async #getRefreshToken(loginOptions: LoginOptions): Promise<RefreshToken> {
    const response = await axios.post<RefreshToken>(
      '/auth/login',
      {
        device: this.options.device,
        ...loginOptions,
      },
      { headers: this.headers }
    );

    return response.data;
  }

  async #getSessionToken({ refreshToken }: RefreshToken) {
    const response = await axios.post<any, any>(
      '/auth/refresh',
      {
        token: refreshToken,
      },
      { headers: this.headers }
    );

    if (response.data) {
      this.token = response.data.token;
    }
  }

  async login(loginOptions: LoginOptions): Promise<typeof this.token> {
    if (!loginOptions.email || !loginOptions.password) throw new Error('Unohrit');

    const token = await this.#getRefreshToken(loginOptions);
    await this.#getSessionToken(token);

    console.log(token);
    return this.token;
  }
}

export { Client };
