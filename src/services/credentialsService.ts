import { CredentialData } from "@/protocols/protocols";
import * as encryptUtils from "../utils/encrypt";
import { duplicatedTitleError, notFoundError, unauthorizedAccess } from "../utils/errors";
import * as credentialRepository from '../repositories/credentialRepository';
import { CredentialToBody } from "@/schemas/credentialSchema";

async function createCredential(
    userId: number,
    credentialData: CredentialToBody
  ) {
    await validateTitle(userId, credentialData.title);
    const encryptedPassword = encryptUtils.encryptData(credentialData.password);
    const credentialInfo = {
      userId: userId,
      ...credentialData
    }
    const credential = await credentialRepository.createCredential({
      ...credentialInfo,
      password: encryptedPassword
    });

return credential
  }

async function validateTitle(userId: number, title: string): Promise<void> {
    const titleExists = await credentialRepository.getTitleByUserId(
      userId,
      title
    );
    if (titleExists) {
      throw duplicatedTitleError();
    }
  }


async function getAllCredentials (userId: number) {

  
    const credentials = await credentialRepository.getAll(userId);


    if (credentials.length === 0) {
      throw notFoundError();
    }


    const credentialsWithDecryptedPassword = credentials.map((credential) => {
      const { password } = credential;
      const decryptedPassword = encryptUtils.decryptData(password);
      return { ...credential, password: decryptedPassword };
    });
    return credentialsWithDecryptedPassword;
  };


async function getCredentialById(userId: number, id: number) {
  
    const credential = await credentialRepository.getById(id);
    
    if (!credential) {
      throw notFoundError();
    }
    if (credential.userId !== userId) {
      throw unauthorizedAccess();
    }
    const { password } = credential;
	const decryptedPassword =  encryptUtils.decryptData(password);
	return { ...credential, password: decryptedPassword };
  }

  export async function deleteCredential(id: number) {
    await credentialRepository.deleteCredential(id);
  }

  const credentialService = {
    createCredential, 
    getAllCredentials,
    getCredentialById,
    deleteCredential
  };
  
  export default credentialService;