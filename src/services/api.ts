import z from "zod";
import { api } from "../api/instance";
import { CreateTaskIntut, TaskResponse } from "../types/types";
import { createTaskSchema } from "../utils/validation/schema";

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

export async function createTask(data: CreateTaskIntut): Promise<ActionState> {
  const { data: response } = await api.post(BASE_URL, data);
  
  return response;
}
