import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { env } from "../config/env";
import { AuthResponse } from "../types/types";

export const api = axios.create({
  baseURL: env.backendUrl,
});

export const auth = axios.create({
  baseURL: env.keycloakUrl,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = Cookies.get("access_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest.headers["X-Retry"]) {
      originalRequest.headers["X-Retry"] = "true";

      try {
        const refreshToken = Cookies.get("refresh_token");

        const params = new URLSearchParams({
          grant_type: "refresh_token",
          client_id: `${env.keycloakClient}`,
          refresh_token: refreshToken || "",
        });

        const { data } = await auth.post<AuthResponse>("/token", params);

        Cookies.set("access_token", data.access_token);
        Cookies.set("refresh_token", data.refresh_token);

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

        return api(originalRequest);
      } catch (refreshError) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");

        //if (typeof window !== "undefined") window.location.href = "/";

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
