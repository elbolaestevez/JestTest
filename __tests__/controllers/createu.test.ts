import { TaskRequest, TaskResponse } from "../../src/types/tasks.types";
import { Types } from "mongoose";
import dotenv from "dotenv";
import { TaskController } from "../../src/controllers/task.controller";
import e, { Request, Response, NextFunction } from "express";
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
    const expectedTask = {
      title: randomWord,
      description: "Descripción de la tarea",
      status: "pendiente",
      id: userId,
    };
    newServiceCreateMock.mockResolvedValue(expectedTask as any);

    mockRequest = {
      body: {
        title: randomWord,
        description: "This is a sample task",
        user: userId,
      },
    };

    await TaskController.create(
      mockRequest as any,
      mockResponse as any,
      mockNext
    );
    if (mockResponse.json) {
      const jsonResponse = JSON.stringify(
        (mockResponse.json as jest.Mock).mock.calls[0][0]
      );

      expect(jsonResponse).toEqual(
        JSON.stringify({
          title: randomWord,
          description: "Descripción de la tarea",
          status: "pendiente",
          id: userId,
        })
      );
    }
    if (mockResponse.status) {
      const status = (
        mockResponse.status as jest.MockedFunction<
          (
            code: number
          ) => Response<ErrorResponse | TaskResponse, Record<string, any>>
        >
      ).mock.calls[0][0];

      expect(status).toBe(201);
    }
  });
});
