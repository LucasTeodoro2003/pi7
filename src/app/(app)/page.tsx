"use server";

import { auth } from "@/shared/lib/auth";
import db from "@/shared/lib/prisma";
import { redirect } from "next/navigation";
import PageClient from "./page_client";
import { signOut } from "next-auth/react";

export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login");
  }

  const user1 = await db.user.findUnique({
    where: { id: userId },
  });

  const users = await db.user.findMany();
  console.log(users);

  if (!user1 || user1.permission != 3) {
    redirect("/noAcess");
  }

  const firstname = user1.name?.split(" ")[0] ?? "Sem Nome";


  return (
      <PageClient user={user1} firtsname={firstname} users={users} />
  );
}
