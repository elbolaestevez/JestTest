import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: "pendiente" | "en-progreso" | "completada";
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pendiente", "en-progreso", "completada"],
      default: "pendiente",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITask>("Task", TaskSchema);
