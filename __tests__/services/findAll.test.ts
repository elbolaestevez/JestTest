import mongoose from "mongoose";
import dotenv from "dotenv";
import { TaskService } from "../../src/services/task.service";
import { TaskRepository } from "../../src/repositories/task.repository";

dotenv.config();

describe("findAll", () => {
  it("should return an array of tasks with length > 0", async () => {
    const mockTasks = [
      {
        _id: "1",
        title: "Tarea 1",
        description: "Descripción 1",
        status: "pendiente",
      },
      {
        _id: "2",
        title: "Tarea 2",
        description: "Descripción 2",
        status: "pendiente",
      },
    ];
    jest
    .spyOn(TaskRepository, "findAllTasks")
    .mockResolvedValue(mockTasks as any);

    const tasks = await TaskService.findAll();

    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBeGreaterThan(1);
  });
});
