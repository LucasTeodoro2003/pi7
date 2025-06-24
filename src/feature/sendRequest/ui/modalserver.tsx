import { User } from "@prisma/client";
import ModalClient from "./modalclient";

interface ModalServerSendRequestProps {
  user: User;
  setOpenModal: (open: boolean) => void;
  openModal: boolean;
}

export default function ModalServerSendRequest({
  user,
  setOpenModal,
  openModal,
}: ModalServerSendRequestProps) {
  return <ModalClient openModal={openModal} user={user} setOpenModal={setOpenModal}/>;
}
