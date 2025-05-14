import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/shared/lib/login-form-client"
import { auth } from "@/shared/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await auth();
    const userId = session?.user?.id;
  
    if (userId) {
      redirect("/");
    }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center shadow-2xl shadow-black">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block shadow-2xl shadow-sky-600">
        <img
          src="https://static.vecteezy.com/ti/vetor-gratis/p1/35724238-3d-compras-bolsa-bolsa-com-desconto-e-presente-caixa-oferta-desconto-conectados-compras-conceito-para-promocao-marketing-e-publicidade-dentro-social-redes-3d-renderizacao-ilustracao-vetor.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
