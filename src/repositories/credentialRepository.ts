import { CredentialData } from "@/protocols/protocols";
import { prisma } from "../config/database";

export async function createCredential(credential: CredentialData){
    
    return prisma.credential.create({
      data: credential
    });
  };
  
  export async function getTitleByUserId (userId: number, title: string) {
    return prisma.credential.findFirst({
      where: {
        userId,
        title
      }
    });
  };

  export async function getAll (userId: number)  {
    return prisma.credential.findMany({ where: { userId } });
  };

  export async function getById(id: number) {
    return prisma.credential.findUnique({ where: { id } });
  };

  export async function deleteCredential(id: number) {
    return prisma.credential.delete({ where: { id } });
  };