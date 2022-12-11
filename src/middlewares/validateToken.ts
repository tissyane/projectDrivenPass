import userRepository from "../repositories/userRepository";
import { invalidCredentialsError } from "../utils/errors";
import { User } from "@prisma/client";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Aqui")
  const authorization =  req.header("Authorization");
  if (!authorization) throw invalidCredentialsError();
  console.log("Aqui 2")
  const token = authorization.replace("Bearer ", "");
  if (!token) throw invalidCredentialsError();
  console.log("Aqui 3")
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };
    const user = await getUserbyID(userId);
    res.locals.user = user;

   
  } catch (error) {
    res.sendStatus(422)
  }
  next();
}


async function getUserbyID(id: number): Promise<GetUserOrFailResult> {
  const user = await userRepository.findById(id);
  if (!user) throw invalidCredentialsError();

  return user;
}

type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;