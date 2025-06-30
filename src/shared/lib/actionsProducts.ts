"use server";

import db from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { fileToBase64 } from "./convertImage";

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

export async function edityProduct(productId: string, formData: FormData) {
  try {
    await db.products.update({
      where: { id: productId },
      data: {
        updatedAt: new Date(),
        image: await fileToBase64(formData.get("image") as File),
        price: formData.get("price")?.toString(),
        link: formData.get("link")?.toString(),
        nome: formData.get("name")?.toString()
      }
    });
    revalidatePath('/')
  } catch (error) {
    console.error("Erro ao atualizar Post:", error);
    throw new Error("Falha ao atualizar o Post.");
  }
}
