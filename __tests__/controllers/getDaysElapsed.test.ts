import dotenv from "dotenv";
import { TaskController } from "../../src/controllers/task.controller";
import { Request, Response, NextFunction } from "express";
import { TaskService } from "../../src/services/task.service";
import { ErrorResponse } from "../../src/types/error.types";
import { TaskResponse } from "../../src/types/tasks.types";

dotenv.config();

describe("create", () => {
  let mockRequest: Request<
    { id: string },
    string | ErrorResponse,
    Record<string, never>,
    Record<string, never>
  >;
  let mockResponse: Partial<Response<TaskResponse[] | ErrorResponse>>;
  let mockNext: NextFunction;
  beforeEach(async () => {
    jest.mock("../../src/services/task.service");
    mockRequest = {
      params: {
        id: "5f9a2f87c2bf891488fbb94b",
      },
    } as Request<
      { id: string },
      string | ErrorResponse,
      Record<string, never>,
      Record<string, never>
    >;
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });
  afterEach(async () => {
    jest.clearAllMocks();
  });
  it("should get days elapsed", async () => {
    const newServiceCreateMock = jest.spyOn(TaskService, "getDaysElapsed");

    const days = "days:1 - hours:2";
    newServiceCreateMock.mockResolvedValue(days as any);
    await TaskController.getDaysElapsed(
      mockRequest as any,
      mockResponse as any,
      mockNext
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.any(String));
  });
});
