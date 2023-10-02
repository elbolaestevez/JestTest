import dotenv from "dotenv";
import { TaskController } from "../../src/controllers/task.controller";
import { Request, Response, NextFunction } from "express";
import { TaskService } from "../../src/services/task.service";
import { ErrorResponse } from "../../src/types/error.types";
import { TaskResponse } from "../../src/types/tasks.types";

dotenv.config();

describe("update Task", () => {
  const taskId = "5f9a2f87c2bf891488fbb94b";
  const mockRequest: Partial<
    Request<
      { id: string },
      TaskResponse | ErrorResponse,
      { title: string },
      Record<string, never>
    >
  > = {
    params: {
      id: taskId,
    },
  };
  let mockResponse: Partial<Response<TaskResponse | ErrorResponse>>;
  let mockNext: NextFunction;

  beforeEach(async () => {
    jest.mock("../../src/services/task.service");

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });
  afterEach(async () => {
    jest.clearAllMocks();
  });
  it("should update Task by Id", async () => {
    const mockTaskServiceUpdate = jest.spyOn(TaskService, "update");
    const validRequestBody = { title: "Updated Task" };
    const updatedTask = { ...validRequestBody, _id: taskId } as any;

    mockRequest.params = { id: taskId };
    mockRequest.body = validRequestBody;

    mockTaskServiceUpdate.mockResolvedValue(updatedTask as any);
    await TaskController.update(
      mockRequest as any,
      mockResponse as any,
      mockNext
    );
    if (mockResponse.json) {
      const jsonResponse = JSON.stringify(
        (mockResponse.json as jest.Mock).mock.calls[0][0]
      );

      expect(jsonResponse).toEqual(JSON.stringify(updatedTask));
    }
    if (mockResponse.status) {
      const status = (
        mockResponse.status as jest.MockedFunction<
          (
            code: number
          ) => Response<ErrorResponse | TaskResponse[], Record<string, any>>
        >
      ).mock.calls[0][0];

      expect(status).toBe(201);
    }
  });
});
