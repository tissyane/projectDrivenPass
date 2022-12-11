import { User} from '@prisma/client';

export type AuthData = Omit<User, 'id'>;

export type ApplicationError = {
    name: string;
    message: string;
  };