import dotenv from "dotenv";
import { TaskRepository } from "../../src/repositories/task.repository";
import { TaskService } from "../../src/services/task.service";
import { ErrorResponse } from "../../src/types/error.types";

dotenv.config();

describe("find tasks with status", () => {
  it("it should return tasks with pendiente", async () => {
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
      .spyOn(TaskRepository, "findTaskByStatus")
      .mockResolvedValue(mockTasks as any);
    const result = await TaskService.findByStatus("pendiente");

    expect(result).toEqual(
      mockTasks.map((task) => ({
        status: task.status,
        description: task.description,
        title: task.title,
        id: task._id,
      }))
    );
  });
  it("throws 'Task not found' when status is not find", async () => {
    jest.spyOn(TaskRepository, "findTaskByStatus").mockResolvedValue([]);
    try {
      const task = (await TaskService.findByStatus(
        "completada"
      )) as ErrorResponse;
      expect(task.error).toContain("Task not found");
    } catch (error) {}
  });
  it("throws 'Task not found' when status is not find", async () => {
    try {
      const task = (await TaskService.findByStatus(
        "completadaa"
      )) as ErrorResponse;
      expect(task.error).toContain("Status no valid");
    } catch (error) {}
  });
 

});
