"use server";

import db from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: string) {
  try {
    await db.products.delete({
      where: { id: productId },
    });
    revalidatePath('/')
  } catch (error) {
    console.error("Erro ao deletar Post:", error);
    throw new Error("Falha ao deletar o Post.");
  }
}

export async function edityProduct(productId: string) {
  try {
    await db.products.update({
      where: { id: productId },
      data: {
        updatedAt: new Date()

      }
    });
    revalidatePath('/')
  } catch (error) {
    console.error("Erro ao atualizar Post:", error);
    throw new Error("Falha ao atualizar o Post.");
  }
}
