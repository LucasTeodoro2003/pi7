"use server";

import db from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updatePermissionProduct(userId: string, productIds: string[], formData: FormData) {
  try {
    await db.products.updateMany({
      where: {
        id: { in: productIds },
        userProduct: userId,
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