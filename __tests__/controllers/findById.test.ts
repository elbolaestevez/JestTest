import { Types } from "mongoose";
import dotenv from "dotenv";
import { TaskController } from "../../src/controllers/task.controller";
import { Request, Response, NextFunction } from "express";
import { TaskService } from "../../src/services/task.service";
import { ErrorResponse } from "../../src/types/error.types";
import { TaskResponse } from "../../src/types/tasks.types";

dotenv.config();

describe("findOne", () => {
  const mockRequest: Partial<
    Request<
      { id: string },
      TaskResponse,
      Record<string, never>,
      Record<string, never>
    >
  > = {
    params: {
      id: "5f9a2f87c2bf891488fbb94b", // Un ID de ejemplo en forma de cadena
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
  it("should return  Task by Id", async () => {
    const newServiceCreateMock = jest.spyOn(TaskService, "findById");

    const task = {
      title: "Tarea 1",
      description: "Descripción de la tarea 1",
      status: "pendiente",
      id: "1sadasdasdasdaccffsdsf",
    };
    newServiceCreateMock.mockResolvedValue(task as any);
    await TaskController.findById(
      mockRequest as any,
      mockResponse as any,
      mockNext
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      title: "Tarea 1",
      description: "Descripción de la tarea 1",
      status: "pendiente",
      id: "1sadasdasdasdaccffsdsf",
    });
  });
});
