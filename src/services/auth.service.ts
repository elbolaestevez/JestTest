import { UserRepository } from "../repositories/user.repository";
import { RegisterRequest } from "../types/user.types";
import { ErrorResponse } from "../types/error.types";
import { registerRequestSchema } from "../utils/validators";

class AuthService {
  static async register(userBody: RegisterRequest) {
    try {
      const { error } = registerRequestSchema.validate(userBody);

      if (error) {
        return { error: error.details[0].message, code: 400 };
      }
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
