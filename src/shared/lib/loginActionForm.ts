"use server";

import { signIn } from "./auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (err) {
    redirect("/login?error=" + encodeURIComponent("Credenciais inválidas!"));
  }
}
