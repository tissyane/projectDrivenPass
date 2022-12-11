import { CredentialData } from "@/protocols/protocols";
import * as encryptUtils from "../../utils/encrypt";
import { duplicatedTitleError, notFoundError } from "../../utils/errors";
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
      throw duplicatedTitleError();
    }
  }

  export const getAllCredentials = async (userId: number) => {
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
  

  const credentialService = {
    createCredential, 
    getAllCredentials
  };
  
  export default credentialService;