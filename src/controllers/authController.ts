import { Request, Response } from "express";
import { AuthData } from "@/protocols/protocols";
import httpStatus from "http-status";
import authService from "../services/auth-services/authService";

export async function signIn(req: Request, res: Response) {
  const body = req.body as AuthData;

  try {
    const result = await authService.signIn(body);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}


