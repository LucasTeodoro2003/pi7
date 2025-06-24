"use server";

import db from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updatePermissionUser(usersId: string[], permission: number) {
  try {
    await db.user.updateMany({
      where: { id: {in: usersId} },
      data: {
        authorizationDate: new Date(),
        authorizationUp: true,
        updatedAt: new Date(),
        permission: permission
      },
    });
    revalidatePath('/')
  } catch (error) {
    console.error("Erro ao atualizar usuários:", error);
    throw new Error("Falha ao atualizar o usuários.");
  }
}
