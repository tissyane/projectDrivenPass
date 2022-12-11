import { Router } from 'express';
import * as authController from '../controllers/authController';
import * as userController from '../controllers/userController';
import validateSchema from '../middlewares/validateSchema';
import { userSchema } from '../schemas/userSchema';

const userRouter = Router();


userRouter.post(
  '/signup',
  validateSchema(userSchema),
  userController.signUp
);

userRouter.post(
  '/signin',
  validateSchema(userSchema),
 authController.signIn
);

export default userRouter;

