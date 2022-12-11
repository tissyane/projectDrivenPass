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
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}


