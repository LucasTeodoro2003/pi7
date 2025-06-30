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
}

export default function ModalClient({ openModal, user }: ModalClientPromp) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const formData = new FormData(e.currentTarget);
    await updateUser(user.id, formData);
  } catch (err) {
    alert("Erro ao atualizar");
  }
  setIsSubmitting(false);
  alert("Para criar e/ou editar Promoçoes e Cupons, solicite acesso elevado clicando na sua Foto")
};

  return (
    <Dialog open={openModal}>
      <DialogContent className="sm:max-w-[425px] max-w-[90%] rounded-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Primeiro Acesso</DialogTitle>
            <DialogDescription>Digite suas informações</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 ">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center">
                Nome
              </Label>
              <Input id="name" className="col-span-3" name="name" />
            </div>
            <div className="flex w-full items-center gap-1.5">
            <Label htmlFor="image" className="text-center">
                Selecione sua foto
              </Label>
              <div className="flex w-full items-center gap-1.5">
                <Input id="image" type="file" name="image"/>
              </div>
            </div>
          </div>
          <DialogFooter>
                        <Button
              type="submit"
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
