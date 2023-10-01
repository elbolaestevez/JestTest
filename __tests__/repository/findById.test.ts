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
    const validTaskId = new mongoose.Types.ObjectId("650b6b7898261480c129b48e");

    const task = await TaskRepository.findById(validTaskId);
    expect(task).toBeDefined();
    expect(task).toHaveProperty("title");
    expect(task).toHaveProperty("description");
  });
});
