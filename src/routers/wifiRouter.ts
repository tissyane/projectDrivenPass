import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken';
import * as wifiController from '../controllers/wifiController';
import { wifiSchema } from '../schemas/wifiSchema';
import { validateBody } from '../middlewares/validation-middleware';

const wifiRouter = Router();

wifiRouter.use(validateToken);
wifiRouter.post(
  '/network',
  validateBody(wifiSchema),
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