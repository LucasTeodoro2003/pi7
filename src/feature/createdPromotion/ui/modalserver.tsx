import { User } from "@prisma/client";
import ModalClientProduct from "./modalclient";

interface ModalServerProductProps{
  user: User;
  openProduct: boolean;
  setOpenProduct: (open: boolean) => void
}

export default function ModalServerProduct({user, openProduct, setOpenProduct}:ModalServerProductProps,) {
  return <ModalClientProduct openProduct={openProduct} user={user} setOpenProduct={setOpenProduct}/>;
}
