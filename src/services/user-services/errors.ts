
import { ApplicationError } from "../../protocols/protocols";

export function duplicatedEmailError(): ApplicationError {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
  };
}
