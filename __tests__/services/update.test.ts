import { TaskService } from "../../src/services/task.service";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { TaskResponse, UpdateTaskRequest } from "../../src/types/tasks.types";
import { generateRandomWord } from "../../src/utils/generateRandomWord";
import { ErrorResponse } from "../../src/types/error.types";

dotenv.config();
const uri = process.env.MONGO_URI2 || "";

describe("update task", () => {
  beforeAll(async () => {
    await mongoose.connect(uri);
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  const randomTitle = generateRandomWord(6);

  it("update task by invalid id", async () => {
    const taskBody: UpdateTaskRequest = {
      title: randomTitle,
      status: "completada",
    };
    const validTaskId = new mongoose.Types.ObjectId("650be4c9e697d17ca544e7ab");
    try {
      const task = (await TaskService.update(
        validTaskId,
        taskBody
      )) as TaskResponse;

      expect(task).toBeDefined();
      expect(task).toHaveProperty("title");
      expect(task).toHaveProperty("description");
      expect(task.title).toBe(taskBody.title);
      expect(task.status).toBe("completada");
    } catch (error) {
      console.log("error", error);
    }
  });
  it("invalid id for update task", async () => {
    function unknownToStringObjectId(value: unknown): mongoose.Types.ObjectId {
      if (typeof value === "string") {
        return new mongoose.Types.ObjectId(value);
      } else {
        throw new Error("Invalid ObjectId");
      }
    }

    const taskBody: UpdateTaskRequest = {
      title: randomTitle,
      status: "completada",
    };

    const invalidTaskIdString = "650b6b7898261480c129b48e";
    const invalidTaskId: mongoose.Types.ObjectId =
      unknownToStringObjectId(invalidTaskIdString);

    try {
      const task = (await TaskService.update(
        invalidTaskId,
        taskBody
      )) as ErrorResponse;
      expect(task).toBeDefined();
      expect(task.error).toContain("Id inválido");
    } catch (error: any) {
      console.log("error", error);
    }
  });
});
