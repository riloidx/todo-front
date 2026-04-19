import Cookies from "js-cookie";
import { auth } from "../api/instance";
import { env } from "../config/env";

export function getKeycloakAuthUrl() {
  const params = new URLSearchParams({
    client_id: env.keycloakClient,
    response_type: "code",
    scope: "openid",
    redirect_uri: env.frontendUrl,
  });

  return `${env.keycloakUrl}/auth?${params}`;
}

export async function exchangeCodeForToken(code: string) {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: env.keycloakClient,
    code: code,
    redirect_uri: env.frontendUrl,
  });

  const { data } = await auth.post("/token", params);

  Cookies.set("access_token", data.access_token);
  Cookies.set("refresh_token", data.refresh_token);

  return data;
}
