import { CredentialData } from "@/protocols/protocols";
import * as encryptUtils from "../../utils/encrypt";
import { conflictError, notFoundError } from "../user-services/errors";
import * as credentialRepository from '../../repositories/credentialRepository';

export async function createCredential(
    userId: number,
    credentialData: CredentialData
  ) {
    await validateTitle(userId, credentialData.title);
    const encryptedPassword = encryptUtils.encryptData(credentialData.password);
    const credential = await credentialRepository.createCredential(userId, {
      ...credentialData,
      password: encryptedPassword
    });
return credential
  }

  async function validateTitle(userId: number, title: string) {
    const titleExists = await credentialRepository.getTitleByUserId(
      userId,
      title
    );
    if (titleExists) {
      throw conflictError();
    }
  }
  

  