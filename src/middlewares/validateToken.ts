import userRepository from "../repositories/userRepository";
import { invalidCredentialsError } from "../utils/errors";
import { User } from "@prisma/client";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";

dotenv.config();

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  
  const authorization =  req.header("Authorization");
  if (!authorization) return generateUnauthorizedResponse(res);

  
  const token = authorization.replace("Bearer ", "");
  if (!token) return generateUnauthorizedResponse(res);

 
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };
    const user = await getUserbyID(userId);
    res.locals.user = user;
    next();
   
  } catch (error) {
    res.sendStatus(httpStatus.UNAUTHORIZED)
  }
  
}


async function getUserbyID(id: number): Promise<User> {
  const user = await userRepository.findById(id);
  if (!user) throw invalidCredentialsError();

  return user;
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(invalidCredentialsError());
}