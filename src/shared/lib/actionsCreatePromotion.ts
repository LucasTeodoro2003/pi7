"use server";

import db from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { fileToBase64 } from "./convertImage";

export async function createPromotion(userId: string, formData: FormData) {
  const priceNew = ((formData.get("price") as string).includes(".") ? (formData.get("price") as string).replace(".", ",") : `${formData.get("price") as string},00`);
  let data;
  if(formData.get("promoTime") !== ""){
    data = new Date(formData.get("promoTime") as string)
  }else{
    data = new Date(Date.now() + 24 * 60 * 60 * 1000)
  }
  try {
    await db.products.create({
      data: {
        nome: formData.get("name")?.toString() || "",
        link: formData.get("link")?.toString() || "",
        price: priceNew.toString(),
        deleteProduct: data,      
        image: await fileToBase64(formData.get("image") as File),
        userProduct: userId,
        typeProduct: formData.get("type")?.toString() || "",
      },
    });
    revalidatePath("/");
  } catch (error:any) {
    console.error("Erro ao criar Promoção:", error.message);
    throw new Error("Falha ao criar Promoção.");
  }
}