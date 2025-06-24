"use server";

import db from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";

export async function RequestUser(userId: string, description: string) {
  try {
    await db.user.update({
      where: { id: userId },
      data: {
        description: description,
        updatedAt: new Date()
      },
    });
    revalidatePath('/')
  } catch (error) {
    console.error("Erro ao atualizar usuários:", error);
    throw new Error("Falha ao atualizar o usuários.");
  }
}