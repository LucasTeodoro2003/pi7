import { User } from "@prisma/client";
import ModalClient from "./modalclient";

interface ModalPerfilProps{
  user: User;
  setOpenPerfil: (open: boolean) => void;
  openPerfil: boolean
}

export default function ModalPerfil({user, setOpenPerfil, openPerfil}:ModalPerfilProps) {
  const openModal = !user.emailVerified;
  return <ModalClient openModal={openPerfil} user={user} setOpenPerfil={setOpenPerfil}/>;
}
