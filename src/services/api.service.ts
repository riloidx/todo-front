import { api } from "../api/instance";
import { CreateTaskIntut, TaskResponse } from "../types/types";

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

export async function createTask(createTaskInput: CreateTaskIntut): Promise<ActionState> {
  const { data } = await api.post(BASE_URL, createTaskInput);

  return data;
}
