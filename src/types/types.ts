export interface AuthResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskIntut {
  title: string;
  description?: string | null;
}

export interface UpdateTask {
  title?: string;
  description?: string;
  completed?: boolean;
  position?: number;
}
