"use server";

import db from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { fileToBase64 } from "./convertImage";

export async function updateUser(userId: string, formData: FormData) {
  try {
    await db.user.update({
      where: { id: userId },
      data: {
        emailVerified: new Date(),
        name: formData.get("name")?.toString(),
        image: await fileToBase64(formData.get("image") as File),
        updatedAt: new Date()
      },
    });
    revalidatePath('/')
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw new Error("Falha ao atualizar o usuário.");
  }
}
