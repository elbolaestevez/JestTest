import mongoose from "mongoose";
import dotenv from "dotenv";
import { TaskRepository } from "../../src/repositories/task.repository";

dotenv.config();
const uri = process.env.MONGO_URI || "";

describe("findAll", () => {
  beforeAll(async () => {
    await mongoose.connect(uri);
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should return an array of tasks with length > 5", async () => {
    const tasks = await TaskRepository.findAllTasks();

    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBeGreaterThan(5);
  });
});
