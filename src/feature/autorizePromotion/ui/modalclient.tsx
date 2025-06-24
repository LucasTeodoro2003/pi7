import { useState } from "react";
import { updatePermissionProduct } from "@/shared/lib/actionsUpdatePermitionProducts";
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
import { Products, User } from "@prisma/client";

interface ModalAuthorizeProductsPromp {
  openModal: boolean;
  user: User;
  setOpenAuthorize: (open: boolean) => void;
  products: Products[];
}

export default function ModalAuthorizeProducts({
  openModal,
  user,
  setOpenAuthorize,
  products,
}: ModalAuthorizeProductsPromp) {
  // Produtos não autorizados
  const postNotAuthorize = products.filter((product) => !product.authorizeProduct);

  // Estados do formulário
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manipulador de seleção dos produtos
  const handleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Manipulador do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProducts.length === 0) return;
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      await updatePermissionProduct(user.id, selectedProducts, formData);
      setOpenAuthorize(false);
    } catch (err) {
      alert("Erro ao atualizar");
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenAuthorize}>
      <DialogContent className="sm:max-w-[425px] max-w-[90%] rounded-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Primeiro Acesso</DialogTitle>
            <DialogDescription>
              Digite suas informações e autorize produtos
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-center">
                Nome
              </Label>
              <Input
                id="name"
                className="col-span-3"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex w-full items-center gap-1.5">
              <Label htmlFor="image" className="text-center">
                Selecione sua foto
              </Label>
              <div className="flex w-full items-center gap-1.5">
                <Input
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) =>
                    setImage(e.target.files && e.target.files[0] ? e.target.files[0] : null)
                  }
                />
              </div>
            </div>
            <div className="mt-4">
              <Label className="mb-2 block">Selecione os produtos para autorizar:</Label>
              <div className="max-h-48 overflow-auto border rounded px-2 py-1 space-y-2">
                {postNotAuthorize.length === 0 && (
                  <span className="text-gray-400">
                    Nenhum produto pendente de autorização.
                  </span>
                )}
                {postNotAuthorize.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-2 border-b pb-1 last:border-b-0"
                  >
                    <input
                      type="checkbox"
                      id={product.id}
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="accent-sky-600"
                    />
                    <Label htmlFor={product.id} className="cursor-pointer">
                      <span className="font-medium">{product.nome}</span>{" "}
                      <span className="text-xs text-gray-500">
                        ({product.typeProduct}, R$ {product.price})
                      </span>
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.nome}
                          className="inline ml-2 h-8 w-8 object-cover rounded border"
                        />
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={selectedProducts.length === 0 || isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}