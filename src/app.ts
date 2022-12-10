
import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors(), json());


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Magic happens on port ${PORT}`);
});