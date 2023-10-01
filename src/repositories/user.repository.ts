import UserModel from "../models/User.model";
import { RegisterRequest } from "../types/user.types";

class UserRepository {
  static async findEmail(email: string) {
    try {
      const findEmail = await UserModel.findOne({ email });
      return findEmail;
    } catch (error) {
      throw error;
    }
  }
  static async createUser(userBody: RegisterRequest) {
    try {
      const user = await UserModel.create(userBody);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export { UserRepository };
