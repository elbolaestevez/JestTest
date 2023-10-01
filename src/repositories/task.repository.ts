import TaskModel from "../models/Task.model";
import { TaskRequest, UpdateTaskRequest } from "../types/tasks.types";
import mongoose from "mongoose";

class TaskRepository {
  static async createTask(task: TaskRequest) {
    try {
      const newTask = await TaskModel.create(task);
      return newTask;
    } catch (error) {
      throw error;
    }
  }

  static async findTitle(title: string) {
    try {
      const findTask = await TaskModel.findOne({ title });
      return findTask;
    } catch (error) {
      throw error;
    }
  }

  static async findAllTasks() {
    try {
      const tasks = await TaskModel.find();
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id: mongoose.Types.ObjectId) {
    try {
      const task = await TaskModel.findById(id);
    
      return task;
    } catch (error) {
      throw error;
    }
  }

  static async updateTask(
    id: mongoose.Types.ObjectId,
    task: UpdateTaskRequest
  ) {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { $set: task },
      { new: true }
    );
    return updatedTask;
  }

  static async deleteTask(id: mongoose.Types.ObjectId) {
    try {
      const deletedTask = await TaskModel.findByIdAndDelete(id);
      return deletedTask;
    } catch (error) {
      throw error;
    }
  }

  static async findTaskByStatus(status: string) {
    try {
      const tasks = await TaskModel.find({ status });
      return tasks;
    } catch (error) {
      throw error;
    }
  }
}

export { TaskRepository };
