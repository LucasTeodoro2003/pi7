"use server";

import { auth } from "@/shared/lib/auth";
import db from "@/shared/lib/prisma";
import { redirect } from "next/navigation";
import PageClient from "./page_client";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search: string; type: string }>;
}) {
  const session = await auth();
  const userId = session?.user?.id;
  const { search, type } = await searchParams;

  if (!userId) {
    redirect("/login");
  }

  const user1 = await db.user.findUnique({
    where: { id: userId },
  });

  const users = await db.user.findMany();

  if (!user1) {
    redirect("/noAcess");
  }

  const firstname = user1.name?.split(" ")[0] ?? "Sem Nome";

  const products = await db.products.findMany({
    where: {
      OR: [
        {
          deleteProduct: {
            gte: new Date(),
          },
        },
        {
          deleteProduct: {
            equals: null,
          },
        },
      ],
      authorizeProduct: {
        not: null,
      },
      // nome: {
      //   search: search || undefined,
      // },
      typeProduct:
        type === "products"
          ? "PRODUTO"
          : type === "coupons"
          ? "CUPOM"
          : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: {
        include: {
          user: true,
        },
      },
    },
  });

  const allProducts = await db.products.findMany();

  return (
    <PageClient
      user={user1}
      firtsname={firstname}
      users={users}
      products={products}
      allProducts={allProducts}
    />
  );
}
