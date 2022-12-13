import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken';
import { credentialSchema } from '../schemas/credentialSchema';
import * as credentialsController from '../controllers/credentialsController';
import { validateBody } from '../middlewares/validation-middleware';

const credentialsRouter = Router();

credentialsRouter.use(validateToken);

credentialsRouter.post(
  '/credentials',
  validateBody(credentialSchema),
  credentialsController.createCredential
);

credentialsRouter.get(
  '/credentials',
  credentialsController.getAllCredentials
);

credentialsRouter.get(
  '/credentials/:id',
  credentialsController.getCredentialById
);

credentialsRouter.delete(
  '/credentials/:id',
  credentialsController.deleteCredential
);

export default credentialsRouter;