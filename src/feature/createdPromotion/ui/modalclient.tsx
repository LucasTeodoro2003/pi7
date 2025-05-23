import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { User } from "@prisma/client";
import { createPromotion } from "@/shared/lib/actionsCreatePromotion";
import { useState } from "react";

interface ModalClientProductPromp {
  openProduct: boolean;
  setOpenProduct: (open: boolean) => void;
  user: User;
}

export default function ModalClientProduct({
  openProduct,
  user,
  setOpenProduct,
}: ModalClientProductPromp) {
  const [type, setType] = useState<string>("PRODUTO");

  return (
    <Dialog open={openProduct} onOpenChange={setOpenProduct}>
      <DialogContent className="sm:max-w-[425px] max-w-[90%] rounded-lg">
        <form action={createPromotion.bind(undefined, user.id)}>
          <DialogHeader>
            <DialogTitle>Cadastro de Promoção</DialogTitle>
            <DialogDescription>
              Digite as informações do Produto ou Cupom
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="name" className="mb-1 font-medium">
                  Nome / Código Cupom
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ex: Fone / cupomMania10"
                  required
                />
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
                  placeholder="Valor"
                  required
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
                  required
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
              <Input id="image" name="image" type="file" required />
            </div>

            {/* VALOR DO TIPO  */}
            <input type="hidden" name="type" value={type} />
            {/* VALOR DO TIPO  */}
          </div>

          <DialogFooter className="flex justify-between items-center flex-row">
            <div className="flex items-center">
              <Label htmlFor="isCoupon" className="text-sm font-medium mr-2">
                Tipo:
              </Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipo</SelectLabel>
                    <SelectItem value="PRODUTO">PRODUTO</SelectItem>
                    <SelectItem value="CUPOM">CUPOM</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
