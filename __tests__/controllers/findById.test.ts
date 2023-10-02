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
    if (mockResponse.json) {
      const jsonResponse = JSON.stringify(
        (mockResponse.json as jest.Mock).mock.calls[0][0]
      );

      expect(jsonResponse).toEqual(JSON.stringify(task));
    }
    if (mockResponse.status) {
      const status = (
        mockResponse.status as jest.MockedFunction<
          (
            code: number
          ) => Response<ErrorResponse | TaskResponse[], Record<string, any>>
        >
      ).mock.calls[0][0];

      expect(status).toBe(200);
    }
  });

  it("should return with invalidId when the id is not a mongooseId", async () => {
    const newServiceCreateMock = jest.spyOn(TaskService, "findById");
    if (mockRequest.params) {
      mockRequest.params.id = "ID_INVALIDO";
    }
    const task = {
      error: "Invalid Id",
      code: 400,
    };
    newServiceCreateMock.mockResolvedValue(task);
    await TaskController.findById(
      mockRequest as any,
      mockResponse as any,
      mockNext
    );
    if (mockResponse.status) {
      const status = (
        mockResponse.status as jest.MockedFunction<
          (
            code: number
          ) => Response<ErrorResponse | TaskResponse[], Record<string, any>>
        >
      ).mock.calls[0][0];

      expect(status).toBe(400);
    }
  });
  it("should return Task not found", async () => {
    const newServiceCreateMock = jest.spyOn(TaskService, "findById");

    const task = {
      error: "Task not found",
      code: 404,
    };
    newServiceCreateMock.mockResolvedValue(task);
    await TaskController.findById(
      mockRequest as any,
      mockResponse as any,
      mockNext
    );
    if (mockResponse.status) {
      const status = (
        mockResponse.status as jest.MockedFunction<
          (
            code: number
          ) => Response<ErrorResponse | TaskResponse[], Record<string, any>>
        >
      ).mock.calls[0][0];

      expect(status).toBe(404);
    }
  });
});
