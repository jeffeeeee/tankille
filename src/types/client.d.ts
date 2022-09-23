export type ClientOptions = {
  readonly device: string;
  readonly userAgent: string;
  [key: string]: string;
};

export type LoginOptions = {
  readonly email: string;
  readonly password: string;
};

export type RefreshToken = {
  refreshToken: string;
};
