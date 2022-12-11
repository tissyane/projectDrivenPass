import { AuthData } from "@/protocols/protocols";
import { prisma } from "../config/database";

async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email
    }
  });  
}

async function create(data: AuthData ) {
  return prisma.user.create({
    data,
  }); 
}

const userRepository = {
  findByEmail,
  create,
};

export default userRepository;