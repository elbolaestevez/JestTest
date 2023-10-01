export interface TaskRequest {
  title: string;
  description: string;
  user: string;
}
export interface TaskRequestUpdate extends TaskRequest {
  status: "pendiente" | "en-progreso" | "completada";
}
export type UpdateTaskRequest = Partial<TaskRequestUpdate>;

export interface TaskResponse {
  title: string;
  description: string;
  status: "pendiente" | "en-progreso" | "completada";
  id: string;
}
