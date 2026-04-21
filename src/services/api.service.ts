import { api } from "../api/instance";
import { TaskResponse } from "../types/types";
import { CreateTaskType, UpdateTaskCompletedType, UpdateTaskContentType, UpdateTaskPositionType } from "../utils/validation/schema";

const BASE_URL = "/tasks";

interface ActionState {
  errors?: Record<string, string[]>;
  success?: boolean;
  message?: string;
}

export async function fetchActiveTasks(): Promise<TaskResponse[]> {
  const { data } = await api.get(`${BASE_URL}/active`);

  return data;
}

export async function fetchCompletedTasks(): Promise<TaskResponse[]> {
  const { data } = await api.get(`${BASE_URL}/completed`);

  return data;
}

export async function fetchTaskById(id: number): Promise<TaskResponse> {
  const { data } = await api.get(`${BASE_URL}/${id}`);

  return data;
}

export async function createTask(
  createTaskType: CreateTaskType,
): Promise<ActionState> {
  const { data } = await api.post(BASE_URL, createTaskType);

  return data;
}

export async function updateContentTask(
  id: number,
  input: UpdateTaskContentType,
): Promise<TaskResponse> {
  const { data } = await api.patch(`${BASE_URL}/${id}`, input);

  return data;
}

export async function updateCompletedTask(
  id: number,
  input: UpdateTaskCompletedType,
): Promise<TaskResponse> {
  const { data } = await api.patch(`${BASE_URL}/${id}/completed`, input);

  return data;
}

export async function updatePositionTask(
  id: number,
  input: UpdateTaskPositionType,
): Promise<TaskResponse> {
  const { data } = await api.patch(`${BASE_URL}/${id}/position`, input);

  return data;
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`${BASE_URL}/${id}`);
}
