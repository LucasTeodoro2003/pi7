"use client";

import { useSearchParams } from "next/navigation";

export function LoginErrorMessage() {
  const params = useSearchParams();
  const error = params.get("error");

  if (error) {
    return <span className="text-red-600 text-sm">Credenciais inválidas!</span>;
  } else {
    return null;
  }
}
