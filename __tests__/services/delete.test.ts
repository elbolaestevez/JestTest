import { TaskService } from "../../src/services/task.service";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { TaskRequest } from "../../src/types/tasks.types";
import { generateRandomWord } from "../../src/utils/generateRandomWord";
import { TaskRepository } from "../../src/repositories/task.repository";

dotenv.config();
const uri = process.env.MONGO_URI2 || "";

describe("delete task", () => {
  beforeAll(async () => {
    await mongoose.connect(uri);
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  it("delete task by id", async () => {
    const randomTitle = generateRandomWord(6);
    jest
      .spyOn(TaskRepository, "deleteTask")
      .mockResolvedValue({
        message: "Task was eliminated successfully",
      } as any);

    const taskBody: TaskRequest = {
      title: randomTitle,
      description: "This is a sample task",
      user: new mongoose.Types.ObjectId("650b6b7898261480c129b48e").toString(),
    };
    try {
      const task = await TaskService.create(taskBody);
      if ("error" in task) {
        return null;
      }
      const deletedTask = await TaskRepository.deleteTask(task.id);
      expect(deletedTask).toEqual({
        message: "Task was eliminated successfully",
      });
    } catch (error) {
      console.log("error", error);
    }
  });
});
