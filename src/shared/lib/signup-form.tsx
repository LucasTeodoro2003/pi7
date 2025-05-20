import { House } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { signUp } from "./actionsCreateuser";
import { redirect } from "next/navigation";
import { LoginErrorMessage } from "./login-error-message";
import { Suspense } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div>
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-md">
            <a href="/login" className="hover:cursor-pointer">
              <House className="size-6" />
            </a>
          </div>
          <h1 className="text-xl font-bold">Criar Usuarios</h1>
        </div>
        <div className="max-w-md mx-auto bg-gradient-to-tr from-blue-50 via-white to-blue-50 p-8 rounded-xl shadow-lg">
          <form
            action={async (formData: FormData) => {
              "use server";
              const res = await signUp(formData);
              if (res.success) {
                redirect("/login");
              } else {
                redirect("/signup?error=" + encodeURIComponent(res.message));
              }
            }}
            className="flex flex-col gap-8"
          >
            <div className="grid gap-3">
              <Label
                htmlFor="email"
                className="text-gray-700 font-semibold text-lg"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition"
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label
                  htmlFor="password"
                  className="text-gray-700 font-semibold text-lg"
                >
                  Senha
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Digite sua senha"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white font-bold py-3 rounded-lg shadow-md hover:bg-slate-700 active:bg-green-400 transition"
            >
              CRIAR
            </Button>
            <div className="text-center">
              <Suspense>
                <LoginErrorMessage />
              </Suspense>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
