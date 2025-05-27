"use server";

import { auth } from "@/shared/lib/auth";
import db from "@/shared/lib/prisma";
import { redirect } from "next/navigation";
import PageClient from "./page_client";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const session = await auth();
  const userId = session?.user?.id;
  const { search } = await searchParams;

  if (!userId) {
    redirect("/login");
  }

  const user1 = await db.user.findUnique({
    where: { id: userId },
  });

  const users = await db.user.findMany();

  if (!user1 || user1.permission != 3) {
    redirect("/noAcess");
  }

  const firstname = user1.name?.split(" ")[0] ?? "Sem Nome";

  const products = await db.products.findMany({
    where: {
      OR: [
        {
          deleteProdutc: {
            gte: new Date(),
          },
        },
        {
          deleteProdutc: {
            equals: null,
          },
        },
      ],
      nome: {
        search: search || undefined,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <PageClient
      user={user1}
      firtsname={firstname}
      users={users}
      products={products}
    />
  );
}
