"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { exchangeCodeForToken } from "../services/auth.service";

export default function AuthHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      exchangeCodeForToken(code)
        .then(() => {
          router.replace("/tasks");
        })
        .catch((err) => console.error("Auth error", err));
    }
  }, [searchParams, router]);

  return null;
}
