import { Request, Response } from "express";
import { CredentialData } from "@/protocols/protocols";
import httpStatus from "http-status";
import credentialService from "../services/credential-services/credentialsService";

export async function createCredential(req: Request, res: Response) {
  const credentialData: CredentialData = req.body;
  const { id: userId } = res.locals.user;
  
  try {
    const credential = await credentialService.createCredential(
      userId,
      credentialData
    );
    res
      .status(httpStatus.CREATED)
      .send({ Título: credential.title, Url: credential.url });
  } catch (error) {
    if (error.name === "DuplicatedTitleError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getAllCredentials(req: Request, res: Response) {
  const { id: userId } = res.locals.user;

  try {
    const credentialsList = await credentialService.getAllCredentials(userId);
    res.status(httpStatus.OK).send(credentialsList);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
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
    return res.status(httpStatus.BAD_REQUEST).send(error);
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
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
