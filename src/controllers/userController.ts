import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../services/userService";

export async function signUp(req: Request, res: Response) {
 
  const body  = req.body;

  try {
    const user = await userService.createUser(body);
    
    return res.status(httpStatus.CREATED).send({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

