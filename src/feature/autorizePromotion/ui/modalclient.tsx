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
  const postNotAuthorize = products.filter(
    (product) => !product.authorizeProduct
  );

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProducts.length === 0) return;
    setIsSubmitting(true);
    try {
      await updatePermissionProduct(selectedProducts);
      setOpenAuthorize(false);
    } catch (err) {
      alert("Erro ao atualizar");
    }
    setIsSubmitting(false);
    window.location.reload();
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenAuthorize}>
      <DialogContent className="sm:max-w-[425px] max-w-[90%] rounded-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>AUTORIZE OS POSTS</DialogTitle>
            <DialogDescription>
              Para autorizar, selecione os posts e clique em salvar
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="mt-4">
              <Label className="mb-2 block">
                Selecione os produtos para autorizar:
              </Label>
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
                    <Label
                      htmlFor={product.id}
                      className="cursor-pointer flex flex-col gap-1"
                    >
                      <span className="font-medium">{product.nome}</span>
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
                      {product.link && product.link !== "#" ? (
                        <a
                          href={product.link}
                          className="text-cyan-700 underline break-all"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {product.link}
                        </a>
                      ) : (
                        <span className="text-red-700">SEM LINK</span>
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
