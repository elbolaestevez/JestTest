import { Types } from "mongoose";
import dotenv from "dotenv";
import { TaskController } from "../../src/controllers/task.controller";
import { Request, Response, NextFunction } from "express";
import { TaskService } from "../../src/services/task.service";
import { ErrorResponse } from "../../src/types/error.types";
import { TaskResponse } from "../../src/types/tasks.types";

dotenv.config();

describe("create", () => {
  let mockRequest: Request<
    { status: string },
    TaskResponse[],
    Record<string, never>,
    Record<string, never>
  >;

  let mockResponse: Partial<Response<TaskResponse[] | ErrorResponse>>;
  let mockNext: NextFunction;
  beforeEach(async () => {
    jest.mock("../../src/services/task.service");
    mockRequest = {
      params: {
        status: "completada",
      },
    } as Request<
      { status: string },
      TaskResponse[],
      Record<string, never>,
      Record<string, never>,
      Record<string, any>
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
  it("should find tasks with status completada", async () => {
    const newServiceCreateMock = jest.spyOn(TaskService, "findByStatus");

    const tasks = [
      {
        title: "Tarea 1",
        description: "Descripción de la tarea 1",
        status: "completada",
        _id: "1sadasdasdasdaccffsdsf",
      },
      {
        title: "Tarea 2",
        description: "Descripción de la tarea 2",
        status: "completada",
        _id: "11212313123123123asdsas",
      },
    ];
    newServiceCreateMock.mockResolvedValue(tasks as any);
    await TaskController.findByStatus(
      mockRequest as any,
      mockResponse as any,
      mockNext
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(tasks).toHaveLength(2);
  });
});
