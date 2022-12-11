
import { ApplicationError } from "../protocols/protocols";

export function duplicatedEmailError(): ApplicationError {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
  };
}


export function invalidCredentialsError(): ApplicationError {
  return {
    name: "InvalidCredentialsError",
    message: "email or password are incorrect",
  };
}

export function duplicatedTitleError(): ApplicationError {
  return {
    name: "DuplicatedTitleError",
    message: "Your title must be unique for each credential",
  };
}

export function notFoundError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "No result for this search!",
  };
}

export function unauthorizedAccess(): ApplicationError {
  return {
    name: "UnauthorizedAccess",
    message: "You only have access to your credentials",
  };
}