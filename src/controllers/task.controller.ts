import { NextFunction, Request, Response } from "express";
import { TaskRequest, TaskResponse } from "../types/tasks.types";
import { ErrorResponse } from "../types/error.types";
import { TaskService } from "../services/task.service";

class TaskController {
  static async create(
    req: Request<
      Record<string, never>,
      TaskResponse,
      TaskRequest,
      Record<string, never>
    >,
    res: Response<TaskResponse | ErrorResponse>,
    next: NextFunction
  ) {
    try {
      const task = await TaskService.create(req.body);

      if ("error" in task) {
        const errorResponse = task;
        return res.status(errorResponse.code).json(errorResponse);
      }

      res.status(201).json(task);
    } catch (error) {
      throw error;
    }
  }

  static async findAll(
    req: Request<
      Record<string, never>,
      TaskResponse[],
      Record<string, never>,
      Record<string, never>
    >,
    res: Response<TaskResponse[]>,
    next: NextFunction
  ) {
    try {
      const tasks = await TaskService.findAll();
      if (tasks.length === 0) {
        return {
          error: "No tasks found",
          code: 200,
        };
      }

      res.status(200).json(tasks);
    } catch (error) {
      throw error;
    }
  }
  static async findById(
    req: Request<
      Record<string, never>,
      TaskResponse | ErrorResponse,
      Record<string, never>,
      Record<string, never>
    >,

    res: Response<TaskResponse | ErrorResponse>,
    next: NextFunction
  ) {
    try {
      const taskId = req.params.id;

      const task = await TaskService.findById(taskId);

      if ("error" in task) {
        const errorResponse = task;
        return res.status(errorResponse.code).json(errorResponse);
      }

      res.status(200).json(task);
    } catch (error) {
      throw error;
    }
  }
  static async update(
    req: Request<
      Record<string, never>,
      TaskResponse | ErrorResponse,
      Record<string, never>,
      Record<string, never>
    >,

    res: Response<TaskResponse | ErrorResponse>,
    next: NextFunction
  ) {
    try {
      const taskId = req.params.id;

      const task = await TaskService.update(taskId, req.body);
      if ("error" in task) {
        const errorResponse = task;
        return res.status(errorResponse.code).json(errorResponse);
      }

      res.status(201).json(task);
    } catch (error) {
      throw error;
    }
  }
  static async delete(
    req: Request<
      Record<string, never>,
      { message: string } | ErrorResponse,
      Record<string, never>,
      Record<string, never>
    >,

    res: Response<{ message: string } | ErrorResponse>,
    next: NextFunction
  ) {
    const taskId = req.params.id;

    try {
      const deleteTask = await TaskService.delete(taskId);
      if ("error" in deleteTask) {
        const errorResponse = deleteTask;
        return res.status(errorResponse.code).json(errorResponse);
      }
      res.status(200).json(deleteTask);
    } catch (error) {
      throw error;
    }
  }
  static async findByStatus(
    req: Request<
      Record<string, never>,
      TaskResponse[] | ErrorResponse,
      Record<string, never>,
      Record<string, never>
    >,
    res: Response<TaskResponse[] | ErrorResponse>,
    next: NextFunction
  ) {
    const status = req.params.status;
    enum TaskStatus {
      Pendiente = "pendiente",
      EnProgreso = "en-progreso",
      Completada = "completada",
    }
    if (!Object.values(TaskStatus).includes(status)) {
      const errorResponse: ErrorResponse = {
        error: "Status no valid",
        code: 400,
      };
      return res.status(errorResponse.code).json(errorResponse);
    }
    try {
      const tasks = await TaskService.findByStatus(status);

      return res.status(200).json(tasks);
    } catch (error) {
      throw error;
    }
  }
  static async getDaysElapsed(
    req: Request<
      Record<string, never>,
      { days: number; hours: number } | ErrorResponse,
      Record<string, never>,
      Record<string, never>
    >,
    res: Response<{ days: number; hours: number } | ErrorResponse>,
    next: NextFunction
  ) {
    const taskId = req.params.id;

    try {
      const day = await TaskService.getDaysElapsed(taskId);

      return res.status(200).json(day);
    } catch (error) {
      throw error;
    }
  }
}
export { TaskController };
