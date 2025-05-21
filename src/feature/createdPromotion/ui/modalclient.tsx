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
import {createPromotion} from "@/shared/lib/actionsCreatePromotion"

interface ModalClientProductPromp {
  openProduct: boolean;
  user: User;
}

export default function ModalClientProduct({
  openProduct,
  user,
}: ModalClientProductPromp) {
  return (
    <Dialog open={openProduct}>
      <DialogContent className="sm:max-w-[425px] max-w-[90%] rounded-lg">
        <form action={createPromotion.bind(undefined, user.id)}>
          <DialogHeader>
            <DialogTitle>Cadastro de Promoção</DialogTitle>
            <DialogDescription>Digite as informações do Produto</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="name" className="mb-1 font-medium">
                  Nome
                </Label>
                <Input id="name" name="name" placeholder="Ex: Fone" />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="price" className="mb-1 font-medium">
                  Preço
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="Digite o Preço"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="link" className="mb-1 font-medium">
                  Link
                </Label>
                <Input
                  id="link"
                  name="link"
                  type="url"
                  placeholder="Cole o link aqui"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="promoTime" className="mb-1 font-medium">
                  Duração da Promoção
                </Label>
                <Input id="promoTime" name="promoTime" type="datetime-local" />
              </div>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="image" className="mb-1 font-medium">
                Imagem
              </Label>
              <Input id="image" name="image" type="file" />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
