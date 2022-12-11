import { CredentialData } from "@/protocols/protocols";
import { prisma } from "../config/database";

export async function createCredential(
    userId: number,
    credentialData: CredentialData
  ) {
    const credentialInfo = {
      userId,
      ...credentialData
    };
    return prisma.credential.create({
      data: credentialInfo
    });
  }
  
  export async function getTitleByUserId(userId: number, title: string) {
    return prisma.credential.findFirst({
      where: {
        userId,
        title
      }
    });
  }
  
  export const getAll = async (userId: number) => {
    return prisma.credential.findMany({ where: { userId } });
  };
 