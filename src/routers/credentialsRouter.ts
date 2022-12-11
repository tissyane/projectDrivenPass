import { Router } from 'express';
import validateSchema from '../middlewares/validateSchema';
import { validateToken } from '../middlewares/validateToken';
import { credentialSchema } from '../schemas/credentialSchema';
import * as credentialsController from '../controllers/credentialsController';

const credentialsRouter = Router();

//credentialsRouter.use(validateToken);
credentialsRouter.post(
  '/credentials/',
  validateSchema(credentialSchema),
  credentialsController.createCredential
);

export default credentialsRouter;