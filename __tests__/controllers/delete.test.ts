import dotenv from "dotenv";
import { TaskController } from "../../src/controllers/task.controller";
import { Request, Response, NextFunction } from "express";
import { TaskService } from "../../src/services/task.service";
import { ErrorResponse } from "../../src/types/error.types";

dotenv.config();
describe("delete One", () => {
  const mockRequest: Partial<
    Request<
      { id: string },
      string,
      Record<string, never>,
      Record<string, never>
    >
  > = {
    params: {
      id: "5f9a2f87c2bf891488fbb94b",
    },
  };
  let mockResponse: Partial<Response<string | ErrorResponse>>;
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
  it("should return  Task by Id", async () => {
    const deleteServiceMock = jest.spyOn(TaskService, "delete");
    deleteServiceMock.mockResolvedValue({
      message: "Task was eliminated successfully",
    } as any);
    await TaskController.delete(
      mockRequest as any,
      mockResponse as any,
      mockNext
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Task was eliminated successfully",
    });
  });
});
