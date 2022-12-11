import { Router } from 'express';
import validateSchema from '../middlewares/validateSchema';
import { validateToken } from '../middlewares/validateToken';
import * as wifiController from '../controllers/wifiController';
import { wifiSchema } from '../schemas/wifiSchema';

const wifiRouter = Router();

wifiRouter.use(validateToken);
wifiRouter.post(
  '/network',
  validateSchema(wifiSchema),
  wifiController.createWifi
);

wifiRouter.get(
  '/network',
  wifiController.getAllWifi
);

wifiRouter.get(
  '/network/:id',
  wifiController.getWifiById
);

wifiRouter.delete(
  '/network/:id',
  wifiController.deleteWifi
);

export default wifiRouter;