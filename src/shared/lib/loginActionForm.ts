"use server";

import { signIn } from "./auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (err:any) {
    const errorMessage = err.message.split(". Read more at")[0];
    console.log(errorMessage)
    redirect("/login?error=" + encodeURIComponent(errorMessage));
  }
}
