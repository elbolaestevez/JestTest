import { TaskRequest, UpdateTaskRequest } from "../types/tasks.types";
import { ErrorResponse } from "../types/error.types";
import mongoose from "mongoose";
import {
  isValidMongoId,
  taskValidator,
  updateTaskValidator,
  validateStatus,
} from "../utils/validators";
import { TaskRepository } from "../repositories/task.repository";

class TaskService {
  static async create(taskBody: TaskRequest) {
    try {
      const { error } = taskValidator.validate(taskBody);

      if (error) {
        return { error: error.details[0].message, code: 400 };
      }
      const findTitle = await TaskRepository.findTitle(taskBody.title);

      if (findTitle) {
        const duplicateTitleError: ErrorResponse = {
          error: "Title already exists",
          code: 409,
        };
        return duplicateTitleError;
      }
      const newTask = await TaskRepository.createTask(taskBody);

      const newTaskFormatted = {
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        id: newTask._id,
      };

      return newTaskFormatted;
    } catch (error) {
      throw error;
    }
  }
  static async findAll() {
    try {
      const tasks = await TaskRepository.findAllTasks();
      const formattedTasks = tasks.map((task) => ({
        status: task.status,
        description: task.description,
        title: task.title,
        id: task._id,
      }));
      return formattedTasks;
    } catch (error) {
      throw error;
    }
  }
  static async findById(id: mongoose.Types.ObjectId) {
    try {
      if (!isValidMongoId(id)) {
        const errorResponse: ErrorResponse = {
          error: "Invalid Id",
          code: 400,
        };
        return errorResponse;
      }
      const task = await TaskRepository.findById(id);

      if (!task) {
        const errorResponse: ErrorResponse = {
          error: "Task not found",
          code: 404,
        };
        return errorResponse;
      }
      const findTask = {
        title: task.title,
        description: task.description,
        status: task.status,
        id: task._id,
      };

      return findTask;
    } catch (error) {
      throw error;
    }
  }
  static async update(id: mongoose.Types.ObjectId, body: UpdateTaskRequest) {
    try {
      if (!isValidMongoId(id)) {
        const errorResponse: ErrorResponse = {
          error: "Id inválido",
          code: 400,
        };
        return errorResponse;
      }

      const { error } = updateTaskValidator.validate(body);
      if (error) {
        return { error: error.details[0].message, code: 400 };
      }

      const updatedTask = await TaskRepository.updateTask(id, body);
      if (!updatedTask) {
        const errorResponse: ErrorResponse = {
          error: "Task not found",
          code: 404,
        };
        return errorResponse;
      }
      const updatedTaskFormatted = {
        title: updatedTask.title,
        description: updatedTask.description,
        status: updatedTask.status,
        id: updatedTask._id,
      };
      return updatedTaskFormatted;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id: mongoose.Types.ObjectId) {
    try {
      if (!isValidMongoId(id)) {
        const errorResponse: ErrorResponse = {
          error: "Id inválido",
          code: 400,
        };
        return errorResponse;
      }
      const deletedTask = await TaskRepository.deleteTask(id);
      if (!deletedTask) {
        const errorResponse: ErrorResponse = {
          error: "Task not found",
          code: 404,
        };
        return errorResponse;
      }
      return { message: "Task was eliminated successfully" };
    } catch (error) {
      throw error;
    }
  }
  static async findByStatus(status: string) {
    try {
      const validationError = validateStatus(status);
      if (validationError) {
        const errorResponse: ErrorResponse = {
          error: "Status no valid",
          code: 400,
        };
        return errorResponse;
      }
      const tasks = await TaskRepository.findTaskByStatus(status);
      if (tasks.length === 0) {
        const errorResponse: ErrorResponse = {
          error: "Task not found",
          code: 404,
        };
        return errorResponse;
      }
      const formattedTasks = tasks.map((task) => ({
        status: task.status,
        description: task.description,
        title: task.title,
        id: task._id,
      }));
      return formattedTasks;
    } catch (error) {
      throw error;
    }
  }
  static async getDaysElapsed(mongoid: mongoose.Types.ObjectId) {
    try {
      if (!isValidMongoId(mongoid)) {
        const errorResponse: ErrorResponse = {
          error: "Id inválido",
          code: 400,
        };
        return errorResponse;
      }
      const task = await TaskRepository.findById(mongoid);

      if (!task) {
        const errorResponse: ErrorResponse = {
          error: "Task not found",
          code: 404,
        };
        return errorResponse;
      }
      const currentDate = new Date();

      const createdAt = task.createdAt;

      const elapsedMilliseconds = currentDate.getTime() - createdAt.getTime();

      const elapsedDays = Math.floor(elapsedMilliseconds / (1000 * 3600 * 24));
      const elapsedHours = Math.floor(
        (elapsedMilliseconds % (1000 * 3600 * 24)) / (1000 * 3600)
      );

      return { days: elapsedDays, hours: elapsedHours };
    } catch (error) {
      throw error;
    }
  }
}

export { TaskService };
