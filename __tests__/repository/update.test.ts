import mongoose from "mongoose";
import dotenv from "dotenv";
import { UpdateTaskRequest } from "../../src/types/tasks.types";
import { generateRandomWord } from "../../src/utils/generateRandomWord";
import { TaskRepository } from "../../src/repositories/task.repository";

dotenv.config();
const uri = process.env.MONGO_URI2 || "";

describe("update task", () => {
  beforeAll(async () => {
    await mongoose.connect(uri);
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  it("update task by id", async () => {
    const randomTitle = generateRandomWord(6);

    const taskBody: UpdateTaskRequest = {
      title: randomTitle,
      status: "completada",
    };
    const validTaskId = new mongoose.Types.ObjectId("650be4c9e697d17ca544e7ab");
    try {
      const task = await TaskRepository.updateTask(validTaskId, taskBody);
      if (task) {
        expect(task).toBeDefined();
        expect(task).toHaveProperty("title");
        expect(task).toHaveProperty("description");
        expect(task.title).toBe(taskBody.title);
        expect(task.status).toBe("completada");
      }
    } catch (error) {
      console.log("error", error);
    }
  });
});
