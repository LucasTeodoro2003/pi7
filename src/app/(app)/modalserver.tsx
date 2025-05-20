import { User } from "@prisma/client";
import ModalClient from "./modalclient";

interface ModalServerProps{
  user: User;
}

export default function ModalServer({user}:ModalServerProps) {
  const openModal = !user.emailVerified;
  return <ModalClient openModal={openModal} />;
}
