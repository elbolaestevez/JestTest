import mongoose from "mongoose";
import dotenv from "dotenv";
import { TaskRepository } from "../../src/repositories/task.repository";

dotenv.config();
const uri = process.env.MONGO_URI || "";

describe("findOne", () => {
  beforeAll(async () => {
    await mongoose.connect(uri);
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  it("find task by id", async () => {
    const tasks = await TaskRepository.findTaskByStatus("completada");

    expect(Array.isArray(tasks)).toBe(true);
    tasks.forEach((task) => {
      expect(task.status).toBe("completada");
    });
  });
});
