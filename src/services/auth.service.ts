import { UserRepository } from "../repositories/user.repository";
import { RegisterRequest } from "../types/user.types";
import { ErrorResponse } from "../types/error.types";

class AuthService {
  static async register(userBody: RegisterRequest) {
    try {
      const findUser = await UserRepository.findEmail(userBody.email);
      if (findUser) {
        const duplicateEmailError: ErrorResponse = {
          error: "The email is already registered",
          code: 409,
        };
        return duplicateEmailError;
      }

      const newUser = await UserRepository.createUser(userBody);

      return newUser;
    } catch (error) {
      const errorMessage: ErrorResponse = {
        error:
          "There was an error while trying to register the user, please try again later",
        code: 500,
      };
      throw errorMessage;
    }
  }
}

export { AuthService };
