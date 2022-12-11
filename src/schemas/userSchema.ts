import joi from 'joi';

export const userSchema = joi.object({
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required()
});

 