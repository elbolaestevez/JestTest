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
    Record<string, never>,
    TaskResponse[],
    Record<string, never>,
    Record<string, never>,
    Record<string, any>
  >;
  let mockResponse: Partial<Response<TaskResponse[] | ErrorResponse>>;
  let mockNext: NextFunction;
  beforeEach(async () => {
    jest.mock("../../src/services/task.service");
    mockRequest = {} as Request<
      Record<string, never>,
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
  it("should find all tasks", async () => {
    const newServiceCreateMock = jest.spyOn(TaskService, "findAll");
    const userId = new Types.ObjectId("650b62bf5dff02dce611faa0");

    const tasks = [
      {
        title: "Tarea 1",
        description: "Descripción de la tarea 1",
        status: "pendiente",
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
    await TaskController.findAll(
      mockRequest,
      mockResponse as Response<TaskResponse[]>,
      mockNext
    );
    console.log("tasks", tasks);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(tasks).toHaveLength(2);
  });
});
