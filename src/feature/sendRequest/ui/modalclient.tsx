import { RequestUser } from "@/shared/lib/actionsRequestUser";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { User } from "@prisma/client";
import { useState } from "react";

interface SendRequestPromp {
  openModal: boolean;
  user: User;
  setOpenModal: (open: boolean) => void;
}

export default function SendRequest({
  openModal,
  user,
  setOpenModal,
}: SendRequestPromp) {

const [isSubmitting, setIsSubmitting] = useState(false);
  
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await RequestUser(user.id, formData.get('description') as string);
      setOpenModal(false);
    } catch (err) {
      alert("Erro ao atualizar");
    }
    alert("Enviado aos administradores, por favor aguarde")
    setIsSubmitting(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[425px] max-w-[90%] rounded-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Solicitar Acesso Elevado</DialogTitle>
            <DialogDescription>
              Digite o porque deseja o acesso elevado
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 ">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-center">
                Explicação
              </Label>
              <textarea id="description" className="col-span-full" name="description" required/>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
            >
              {isSubmitting ? "Enviando..." : "Solicitar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
