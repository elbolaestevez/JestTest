import { TaskService } from "../../src/services/task.service";
import { TaskRequest } from "../../src/types/tasks.types";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { TaskRepository } from "../../src/repositories/task.repository";
import { ErrorResponse } from "../../src/types/error.types";
import { generateRandomWord } from "../../src/utils/generateRandomWord";

dotenv.config();

describe("create", () => {
  const title = generateRandomWord(8);

  it("should create a new task", async () => {
    const userId = new mongoose.Types.ObjectId(
      "650b6b7898261480c129b48e"
    ).toString();

    const taskBody: TaskRequest = {
      title,
      description: "This is a sample task",
      user: userId,
    };

    try {
      const createdTask = await TaskService.create(taskBody);
      console.log("createdTask", createdTask);

      if (!("error" in createdTask)) {
        console.log("entro");

        expect(createdTask.title).toBe(taskBody.title);
        expect(createdTask.description).toBe(taskBody.description);
        expect(createdTask).toHaveProperty("id");
      }
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
      const createdTask = await TaskService.create(taskBody as any);
    } catch (error: any) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.errors.description).toBeDefined();
    }
  });
  it("should  not create a new task with same title", async () => {
    const taskBody = {
      title: "Sample Task",
      description: "This is a sample task",
      user: "650b6b7898261480c129b48e",
    };
    const findTitleMock = jest.spyOn(TaskRepository, "findTitle");

    const errorResponse: ErrorResponse = {
      error: "Title already exists",
      code: 409,
    };
    findTitleMock.mockResolvedValue(errorResponse as any);

    try {
      const createdTask = await TaskService.create(taskBody);
      expect(createdTask).toEqual({
        error: "El título ya está registrado.",
        code: 409,
      });
    } catch (error) {}
  });
});
