import mongoose from "mongoose";
import dotenv from "dotenv";
import { TaskController } from "../../src/controllers/task.controller";
import { Response } from "express";
import { generateRandomWord } from "../../src/utils/generateRandomWord";

dotenv.config();
const uri = process.env.MONGO_URI2 || "";

describe("create", () => {
  beforeAll(async () => {
    await mongoose.connect(uri);
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  it("should create a new task", async () => {
    const userId = new mongoose.Types.ObjectId(
      "650b62bf5dff02dce611faa0"
    ).toString();
    const randomWord = generateRandomWord(6);

    const req: any = {
      body: {
        title: randomWord,
        description: "This is a sample task",
        user: userId,
      },
    } as any;

    const res: Response = {
      status: (statusCode: number) => {
        expect(statusCode).toBe(201);
        return res;
      },
      json: (data: any) => {
        expect(data.description).toBe("This is a sample task");
      },
    } as Response;

    const task = await TaskController.create(req, res, () => {});
  });
});
