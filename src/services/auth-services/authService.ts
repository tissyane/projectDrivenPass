import { AuthData } from "@/protocols/protocols";
import { exclude } from "@/utils/prisma-utils";
import { User } from "@prisma/client";
import { invalidCredentialsError } from "./errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userRepository from "../../repositories/userRepository";

type SignInResult = {
    token: string;
  };

type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;

async function signIn(data: AuthData): Promise<SignInResult> {
    const { email, password } = data;
  
    const user = await getUserOrFail(email);
  
    await validatePasswordOrFail(password, user.password);
  
    const token = await generateToken(user.id);
  
    return {token: token};
    
  }

  async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
    const user = await userRepository.findByEmail(email);
    if (!user) throw invalidCredentialsError();
  
    return user;
  }

  async function validatePasswordOrFail(password: string, userPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) throw invalidCredentialsError();
  }


  async function generateToken(userId: number) {
       
    const token = jwt.sign(
        {
          userId: userId
        },
        process.env.JWT_SECRET
      );
  
    return token;
  }



  const authService = {
    signIn,
  };
  
  export default authService;