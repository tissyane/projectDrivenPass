import express from 'express'
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routers/userRouter";
import credentialsRouter from './routers/credentialsRouter';
import wifiRouter from './routers/wifiRouter';
dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.use(userRouter);
server.use(credentialsRouter);
server.use(wifiRouter);

server.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
