import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "../src/config/index";

loadEnv();

import userRouter from "./routers/userRouter";
import credentialsRouter from './routers/credentialsRouter';
import wifiRouter from './routers/wifiRouter';

const app = express();
app
  .use(cors())
  .use(express.json())
  .use(userRouter)
  .use(credentialsRouter)
  .use(wifiRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;