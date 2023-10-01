import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { IUser } from "../models/User.model";
import { RegisterRequest } from "../types/user.types";
import { registerRequestSchema } from "../utils/validators";
import { ErrorResponse } from "../types/error.types";

class AuthController {
  static async register(
    req: Request<
      Record<string, never>,
      IUser,
      RegisterRequest,
      Record<string, never>
    >,
    res: Response<IUser | ErrorResponse>,
    next: NextFunction
  ) {
    try {
      const { error } = registerRequestSchema.validate(req.body);

      if (error) {
        return res.json({ error: error.details[0].message, code: 400 });
      }
      const user = await AuthService.register(req.body);
      if ("error" in user) {
        const errorResponse = user;
        return res.status(errorResponse.code).json(errorResponse);
      }
      return res.status(201).json(user);
    } catch (error) {
      throw error;
    }
  }
}
export { AuthController };
