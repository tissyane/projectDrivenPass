import { AuthData } from "@/protocols/protocols";
import { prisma } from "../config/database";

async function create(data: AuthData ) {
  return prisma.user.create({
    data,
  }); 
}

async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email
    }
  });  
}

async function findById(id: number) {
  return prisma.user.findUnique({ 
    where: { 
      id: id 
    } 
  });
}

const userRepository = {
  create,
  findByEmail,
  findById
};

export default userRepository;