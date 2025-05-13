import { auth } from "@/shared/lib/auth";
import db from "@/shared/lib/prisma";
import { redirect } from "next/navigation";

export default async function NoAcessPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login");
  }

  const user1 = await db.user.findUnique({
    where: { id: userId },
  });

  const users = await db.user.findMany();

  if (!user1 || user1.permission === 3) {
    redirect("/");
  }

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          Sem acesso a Pagina
        </div>
      </div>
    </>
  );
}
