import { TaskRequest, TaskResponse } from "../../src/types/tasks.types";
import { Types } from "mongoose";
import dotenv from "dotenv";
import { TaskController } from "../../src/controllers/task.controller";
import { Request, Response, NextFunction } from "express";
import { generateRandomWord } from "../../src/utils/generateRandomWord";
import { TaskService } from "../../src/services/task.service";
import { ErrorResponse } from "../../src/types/error.types";

dotenv.config();

describe("create", () => {
  let mockRequest: Partial<
    Request<
      Record<string, never>,
      TaskResponse,
      TaskRequest,
      Record<string, never>
    >
  >;
  let mockResponse: Partial<Response<TaskResponse | ErrorResponse>>;
  let mockNext: NextFunction;
  beforeEach(async () => {
    jest.mock("../../src/services/task.service");
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });
  afterEach(async () => {
    jest.clearAllMocks();
  });
  it("should create a new task", async () => {
    const userId = new Types.ObjectId("650b62bf5dff02dce611faa0").toString();
    const randomWord = generateRandomWord(6);

    const newServiceCreateMock = jest.spyOn(TaskService, "create");
    newServiceCreateMock.mockResolvedValue({
      title: "Tarea 40",
      description: "Descripción de la tarea",
      status: "pendiente",
      id: "650c4e377b2d24a6e095af9a",
    } as any);

    mockRequest = {
      body: {
        title: randomWord,
        description: "This is a sample task",
        user: userId,
      },
    };

    const task = await TaskController.create(
      mockRequest as Request<
        Record<string, never>,
        TaskResponse,
        TaskRequest,
        Record<string, never>
      >,

      mockResponse as Response<TaskResponse | ErrorResponse>,
      () => {}
    );

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    if (task) {
      expect(task.status).toBe("pendiente");
    }
  });
});
