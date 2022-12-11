import { ApplicationError } from "@/protocols/protocols";


export function invalidCredentialsError(): ApplicationError {
  return {
    name: "InvalidCredentialsError",
    message: "email or password are incorrect",
  };
}
