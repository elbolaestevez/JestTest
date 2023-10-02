import mongoose from "mongoose";
import dotenv from "dotenv";
import { TaskService } from "../../src/services/task.service";
import { ErrorResponse } from "../../src/types/error.types";
import { TaskRepository } from "../../src/repositories/task.repository";
dotenv.config();
const uri = process.env.MONGO_URI || "";

describe("getDaysElapsed", () => {
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

    const invalidTaskIdString = "650b6b7898261480c129b48e";
    const invalidTaskId: mongoose.Types.ObjectId =
      unknownToStringObjectId(invalidTaskIdString);

    try {
      const task = (await TaskService.getDaysElapsed(
        invalidTaskId
      )) as ErrorResponse;
      expect(task).toBeDefined();
      expect(task.error).toContain("Id inválido");
    } catch (error: any) {
      console.log("error", error);
    }
  });

  it("should return the correct number of days and hours elapsed", async () => {
    const mockTask: any = {
      createdAt: new Date("2023-09-01T00:00:00.000Z"),
    };
    jest.spyOn(TaskRepository, "findById").mockResolvedValue(mockTask);
    const validTaskId = new mongoose.Types.ObjectId("650b62bf5dff02dce611faa0");

    try {
      const task = await TaskService.getDaysElapsed(validTaskId);

      const currentDate = new Date();

      const elapsedMilliseconds: number = (currentDate.getTime() -
        mockTask.createdAt.getTime()) as any;

      const elapsedDays = Math.floor(elapsedMilliseconds / (1000 * 3600 * 24));
      const elapsedHours = Math.floor(
        (elapsedMilliseconds % (1000 * 3600 * 24)) / (1000 * 3600)
      );

      expect(task).toEqual({ days: elapsedDays, hours: elapsedHours });
    } catch (error) {
      throw error;
    }
  });
});
