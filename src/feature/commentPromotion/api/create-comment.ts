"use server";

import db from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createComment(
  userId: string,
  productId: string,
  text: string
) {
  try {
    await db.comments.create({
      data: {
        userId,
        productId,
        texto: text,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    throw new Error("Falha ao criar comentário.");
  }
}
