import { validateBody } from '../middlewares/validation-middleware';
import { Router } from 'express';
import * as userController from '../controllers/userController';
import { userSchema } from '../schemas/userSchema';

const userRouter = Router();


userRouter.post(
  '/signup',
  validateBody(userSchema),
  userController.signUp
);

userRouter.post(
  '/signin',
  validateBody(userSchema),
 userController.signIn
);

export default userRouter;

