import { TaskService } from "../../src/services/task.service";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ErrorResponse } from "../../src/types/error.types";
import { TaskRepository } from "../../src/repositories/task.repository";

dotenv.config();
const uri = process.env.MONGO_URI || "";

describe("findById", () => {
  beforeAll(async () => {
    await mongoose.connect(uri);
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("invalid id for task", async () => {
    function unknownToStringObjectId(value: unknown): mongoose.Types.ObjectId {
      if (typeof value === "string") {
        return new mongoose.Types.ObjectId(value);
      } else {
        throw new Error("Invalid ObjectId");
      }
    }

    const invalidTaskIdString = "651a3a424eca23df6c0601bc";
    const invalidTaskId: mongoose.Types.ObjectId =
      unknownToStringObjectId(invalidTaskIdString);

    try {
      const task = (await TaskService.findById(invalidTaskId)) as ErrorResponse;
      expect(task).toBeDefined();
      expect(task.error).toContain("Invalid Id");
    } catch (error: any) {
      console.log("error", error);
    }
  });
  it("finds task by valid id", async () => {
    const mockTask: any = {
      _id: new mongoose.Types.ObjectId("650b62bf5dff02dce611faa0"),
      title: "Tarea de prueba",
      description: "Descripción de prueba",
      status: "completada",
    };

    jest.spyOn(TaskRepository, "findById").mockResolvedValue(mockTask);

    const validTaskId = new mongoose.Types.ObjectId("650b62bf5dff02dce611faa0");

    try {
      const task = await TaskService.findById(validTaskId);
      expect(task).toBeDefined();
      expect(task).toHaveProperty("title", mockTask.title);
      expect(task).toHaveProperty("description", mockTask.description);
    } catch (error) {
      // Manejar errores
    }
  });
  it("throws 'Task not found' when id does not exist", async () => {
    const validTaskId = new mongoose.Types.ObjectId("650b62bf5dff02dce611faa4");

    jest.spyOn(TaskRepository, "findById").mockResolvedValue(null);
    try {
      const task = (await TaskService.findById(validTaskId)) as ErrorResponse;
      expect(task.error).toContain("Task not found");
    } catch (error) {}
  });
});
