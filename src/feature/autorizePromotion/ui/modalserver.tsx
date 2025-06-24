import { Products, User } from "@prisma/client";
import ModalClient from "./modalclient";

interface ModalServerAuthorizeProductsProps{
  user: User;
  openAuthorize: boolean;
  setOpenAuthorize: (open: boolean) => void
  products: Products[]
}

export default function ModalServerAuthorizeProducts({user, openAuthorize, setOpenAuthorize, products}:ModalServerAuthorizeProductsProps) {
  return <ModalClient openModal={openAuthorize} user={user} setOpenAuthorize={setOpenAuthorize} products={products}/>;
}
