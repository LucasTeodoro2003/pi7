import { Prisma, Products, User } from "@prisma/client";
import ModalClient from "./modalclient";

interface ModalProductsProps{
  user: User;
  products: Prisma.ProductsGetPayload<{
    include: { comments: { include: { user: true } } };
  }>[];
  setOpenPerfil: (open: boolean) => void;
  openPerfil: boolean
  selectProduct: string | null;
}

export default function ModalProducts({user, setOpenPerfil, openPerfil, products, selectProduct}:ModalProductsProps) {
  return <ModalClient openModal={openPerfil} user={user} setOpenPerfil={setOpenPerfil} products={products} selectProduct={selectProduct}/>;
}
