import { Request, Response } from 'express';
import { CredentialData } from '@/protocols/protocols';
import * as credentialService from '../services/credential-services/credentialsService';
import httpStatus from 'http-status';


export async function createCredential(req: Request, res: Response) {
  const credentialData: CredentialData = req.body;
   //const { userId } = res.locals;
  const userId  = 4;

  try {
    const credential = await credentialService.createCredential(
      userId,
      credentialData
    );
    res.status(httpStatus.CREATED).send({Título:credential.title, Url:credential.url});
  } catch (error) {
    if (error.name === "DuplicatedTitleError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getAllCredentials(req: Request, res: Response) {
  //const { userId } = res.locals;
  const userId  = 4;

  try {
    const credentialsList = await credentialService.getAllCredentials(userId);
  
    res.status(200).send(credentialsList);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
 
}

