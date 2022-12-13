import { Request, Response } from "express";
import httpStatus from "http-status";
import credentialService from "../services/credentialsService";
import { CredentialToBody } from "@/schemas/credentialSchema";

export async function createCredential(req: Request, res: Response) {
  const credentialData = req.body as CredentialToBody;
  const { id: userId } = res.locals.user;
  
  try {
    await credentialService.createCredential(
      userId,
      credentialData
    );
    res
      .sendStatus(httpStatus.CREATED)
  } catch (error) {
    if (error.name === "DuplicatedTitleError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
  }
}

export async function getAllCredentials(req: Request, res: Response) {
  const { id: userId } = res.locals.user;

  try {
    const credentialsList = await credentialService.getAllCredentials(userId);
    return res.status(httpStatus.OK).send(credentialsList);

  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
  }
}

export async function getCredentialById(req: Request, res: Response) {
  const id = Number(req.params.id);
   const { id: userId } = res.locals.user;

  try {
    const credential = await credentialService.getCredentialById(userId, id);
    res.status(httpStatus.OK).send(credential);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === "UnauthorizedAccess") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
  }
}

export async function deleteCredential(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { id: userId } = res.locals.user;

  try {
    await credentialService.getCredentialById(userId, id);
    await credentialService.deleteCredential(id);
    res.status(httpStatus.OK).send("Credential deleted");
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === "UnauthorizedAccess") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
  }
}
