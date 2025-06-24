"use server";

import db from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updatePermissionProduct(productIds: string[]) {
  try {
    await db.products.updateMany({
      where: {
        id: { in: productIds },
      },
      data: {
        authorizeProduct: new Date(),
        updatedAt: new Date(),
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    throw new Error("Falha ao atualizar o post.");
  }
}