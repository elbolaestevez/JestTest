import mongoose from "mongoose";
import dotenv from "dotenv";
import { TaskService } from "../../src/services/task.service";

dotenv.config();

describe("findAll", () => {
  it("should return an array of tasks with length > 5", async () => {
    const tasks = await TaskService.findAll();

    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBeGreaterThan(5);
  });
});
