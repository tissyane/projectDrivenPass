import { Request, Response } from "express";
import { AuthData } from "@/protocols/protocols";
import httpStatus from "http-status";
import signUpService from "../services/user-services/signUpService";
import signInService from "../services/user-services/signInService";

export async function signUp(req: Request, res: Response) {
   const body  = req.body;

  try {
    const user = await signUpService.createUser(body);
    
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

export async function signIn(req: Request, res: Response) {
  const body = req.body as AuthData;

  try {
    const result = await signInService.signIn(body);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

