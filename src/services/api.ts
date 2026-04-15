import axios from "axios";
import { env } from "../config/env";
import { AuthResponse } from "../types/types";

export async function fetchToken() {
  const params = new URLSearchParams({
    grant_type: "password",
    client_id: "todo-client",
    username: "test",
    password: "password",
  });

  const { data } = await axios.post<AuthResponse>(env.keycloakUrl, params);

  return data.access_token;
}
