import z from "zod";

const envSchema = z.object({
  backendUrl: z.url(),
  keycloakUrl: z.url(),
});

const parsed = envSchema.safeParse({
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  keycloakUrl: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
  keycloakClient: process.env.KEYCLOAK_CLIENT,
});

if (!parsed.success) {
  console.error("Error of reading env");
  throw Error("Error of reading env");
}

export const env = parsed.data;
