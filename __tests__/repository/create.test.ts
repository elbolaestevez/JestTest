import { TaskRequest } from "../../src/types/tasks.types";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { TaskRepository } from "../../src/repositories/task.repository";
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
  const randomTitle = generateRandomWord(6);

  it("should create a new task", async () => {
    const userId = new mongoose.Types.ObjectId(
      "650b6b7898261480c129b48e"
    ).toString();

    const taskBody: TaskRequest = {
      title: randomTitle,
      description: "This is a sample task",
      user: userId,
    };

    try {
      const createdTask = await TaskRepository.createTask(taskBody);

      expect(createdTask.title).toBe(taskBody.title);
      expect(createdTask.description).toBe(taskBody.description);
      expect(createdTask).toHaveProperty("_id");
    } catch (error) {
      console.log("error", error);
    }
  });
  it("should not create a new task without description", async () => {
    const taskBody = {
      title: "Sample Task2",
      status: "pendiente",
      user: "650b6b7898261480c129b48e",
    };

    try {
      const createdTask = await TaskRepository.createTask(taskBody as any);
    } catch (error: any) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.errors.description).toBeDefined();
    }
  });
});
