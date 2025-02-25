import prisma from "@/shared/lib/prisma";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Link href="login">
        <div>INIT PROJECT</div>
      </Link>
    </div>
  );
}
