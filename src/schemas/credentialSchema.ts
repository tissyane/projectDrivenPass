import { Credential } from '@prisma/client';
import joi from 'joi';

export const credentialSchema = joi.object<CredentialToBody>({
    title: joi.string().required(),
    url: joi
    .string()
    .empty()
    .pattern(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.,~#?&\/=]*)$/
    )
    .required(),
    username: joi.string().required(),
    password: joi.string().required()
  });

export type CredentialToBody = Omit<Credential, 'id' | 'userId'>;
