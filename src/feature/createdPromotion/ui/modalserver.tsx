import { User } from "@prisma/client";
import ModalClientProduct from "./modalclient";

interface ModalServerProductProps{
  user: User;
  openProduct: boolean;
}

export default function ModalServerProduct({user, openProduct}:ModalServerProductProps,) {
  return <ModalClientProduct openProduct={openProduct} user={user}/>;
}
