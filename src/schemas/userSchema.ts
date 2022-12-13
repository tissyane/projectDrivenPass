import { AuthData } from '@/protocols/protocols';
import joi from 'joi';

export const userSchema = joi.object<AuthData> ({
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required()
});

 