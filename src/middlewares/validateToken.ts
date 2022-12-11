import userRepository from "../repositories/userRepository";
import { invalidCredentialsError } from "../services/user-services/errors";
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
  const authorization = req.headers["authorization"];
  if (!authorization) throw invalidCredentialsError();

  const token = authorization.replace("Bearer ", "");
  if (!token) throw invalidCredentialsError();

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };
    const user = await getUserbyID(userId);
    res.locals.user = user;

    next();
  } catch {
    throw invalidCredentialsError();
  }
}


async function getUserbyID(id: number): Promise<GetUserOrFailResult> {
  const user = await userRepository.findById(id);
  if (!user) throw invalidCredentialsError();

  return user;
}

type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;