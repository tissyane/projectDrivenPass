import { User } from "@prisma/client";
import { duplicatedEmailError } from "../../utils/errors";
import bcrypt from "bcrypt";
import { AuthData } from "../../protocols/protocols";
import userRepository from "../../repositories/userRepository";


async function createUser(data: AuthData): Promise<User> {
  
 await validateUniqueEmailOrFail(data.email);

  const hashedPassword = await bcrypt.hash(data.password, 12);
  const userObject: AuthData = {email:data.email, password:hashedPassword}
  return userRepository.create(userObject);
}

async function validateUniqueEmailOrFail(email: string) {
  
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

const signUpService = {
  createUser,
};

export default signUpService;