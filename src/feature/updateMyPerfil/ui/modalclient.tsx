import { updatePerfilUser } from "@/shared/lib/actionsUpdatePerfilUser";
import { updateUser } from "@/shared/lib/actionsUpdateUser";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { User } from "@prisma/client";
import { useState } from "react";

interface ModalClientPromp {
  openModal: boolean;
  user: User;
  setOpenPerfil: (open: boolean) => void;
}

export default function ModalClient({
  openModal,
  user,
  setOpenPerfil,
}: ModalClientPromp) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const formData = new FormData(e.currentTarget);
    await updatePerfilUser(user.id || "", formData);
    setOpenPerfil(false);
    window.location.reload();
  } catch (err) {
    alert("Erro ao atualizar");
  }
  setIsSubmitting(false);
  alert("Atualizado com sucesso")
};
  
  return (
    <Dialog open={openModal} onOpenChange={setOpenPerfil}>
      <DialogContent className="sm:max-w-[425px] max-w-[90%] rounded-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Primeiro Acesso</DialogTitle>
              <img
                src={user.image || ""}
                alt={user.id}
                className="w-12 h-12 rounded-full"
              />
            </div>
            <DialogDescription>Digite suas informações</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 ">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center">
                Nome
              </Label>
              <Input
                id="name"
                className="col-span-3"
                name="name"
                defaultValue={user.name ? user.name : "ERRO"}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-center">
                Email
              </Label>
              <Input
                id="email"
                className="col-span-3"
                name="email"
                defaultValue={user.email ? user.email : "ERRO"}
              />
            </div>
            <div className="flex w-full items-center gap-1.5">
              <Label htmlFor="image" className="text-center">
                Selecione Nova Foto
              </Label>
              <div className="flex w-full items-center gap-1.5">
                <Input id="image" type="file" name="image" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
            >
              {isSubmitting ? "Atualizando..." : "Atualizar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
