export interface IRegister {
  name?: string;
  email?: string;
  password?: string;
}

export interface IAuthenticate {
  email?: string;
  password?: string;
}

export interface IAuthState {
  access_token: string;
}

export interface IAuthContextData {
  signIn(credentials: IAuthenticate): Promise<void>;
  signOut(): void;
  access_token?: string;
}