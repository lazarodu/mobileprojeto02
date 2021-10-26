export interface IRegister {
  name?: string;
  email?: string;
  password?: string;
}

export interface IAuthenticate {
  email?: string;
  password?: string;
}

export interface IUser {
  status: string,
  message: string,
  data: {
    access_token: string,
    user: {
      id: number,
      name: string,
      email: string,
      profile_photo_url: string
    }
  }
}

export interface IAuthState {
  access_token: string,
  user: {
    id: number,
    name: string,
    email: string,
    profile_photo_url: string
  }
}

export interface IAuthContextData {
  signIn(credentials: IAuthenticate): Promise<void>;
  signOut(): void;
  access_token?: string;
  user?: {
    id: number,
    name: string,
    email: string,
    profile_photo_url: string
  }
}