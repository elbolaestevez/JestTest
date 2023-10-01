import Joi from "joi";
import mongoose from "mongoose";

export const registerRequestSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const taskValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  user: Joi.string().length(24).hex().required(),
});
export function isValidMongoId(id: mongoose.Types.ObjectId): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export const updateTaskValidator = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string()
    .valid("pendiente", "en-progreso", "completada")
    .optional(),
});
