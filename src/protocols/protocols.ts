import { Credential, User} from '@prisma/client';

export type AuthData = Omit<User, 'id'>;

export type CredentialData = Omit<Credential, 'id' | 'userId'>;

export type ApplicationError = {
    name: string;
    message: string;
  };





