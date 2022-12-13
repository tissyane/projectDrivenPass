import { Credential, Network, User} from '@prisma/client';

export type AuthData = Omit<User, 'id'>;

export type CredentialData = Omit<Credential, 'id'>;

export type WifiData = Omit<Network, 'id' | 'userId'>;

export type ApplicationError = {
    name: string;
    message: string;
  };





