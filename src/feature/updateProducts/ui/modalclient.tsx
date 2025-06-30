import { edityProduct } from "@/shared/lib/actionsProducts";
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
import { Prisma, User } from "@prisma/client";
import { useState } from "react";

interface ModalEdityProductsPromp {
  openModal: boolean;
  user: User;
  setOpenPerfil: (open: boolean) => void;
  products: Prisma.ProductsGetPayload<{
    include: { comments: { include: { user: true } } };
  }>[];
  selectProduct: string | null;
}

export default function ModalEdityProducts({
  openModal,
  user,
  setOpenPerfil,
  products,
  selectProduct,
}: ModalEdityProductsPromp) {

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const formData = new FormData(e.currentTarget);
    await edityProduct(productSelected?.id || "", formData);
    console.log(formData)
    setOpenPerfil(false);
    window.location.reload();
  } catch (err) {
    alert("Erro ao atualizar");
  }
  setIsSubmitting(false);
};

  const [isSubmitting, setIsSubmitting] = useState(false);

  const productSelected = products.find(
    (product) => product.id === selectProduct
  );

  return (
    <Dialog open={openModal} onOpenChange={setOpenPerfil}>
      <DialogContent className="sm:max-w-[425px] max-w-[90%] rounded-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Editar Produto/Cupom</DialogTitle>
              <img
                src={productSelected?.image || ""}
                alt={productSelected?.id}
                className="w-12 h-12 rounded-full"
              />
            </div>
            <DialogDescription>Modifique as informações</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 col-span-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center col-span-1">
                Nome
              </Label>
              <Input
                id="name"
                className="col-span-1 inline-block"
                name="name"
                defaultValue={
                  productSelected?.nome ? productSelected.nome : "ERRO"
                }
              />
              <Label htmlFor="preco" className="text-center col-span-1">
                Preço
              </Label>
              <Input
                id="price"
                className="col-span-1"
                name="price"
                defaultValue={
                  productSelected?.price ? productSelected.price : "ERRO"
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-center">
                Cupom / Link
              </Label>
              <Input
                id="link"
                className="col-span-3"
                name="link"
                defaultValue={
                  productSelected?.link ? productSelected?.link : "ERRO"
                }
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
            <Button type="submit">
              {isSubmitting ? "Atualizando..." : "Atualizar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
