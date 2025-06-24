import { Products, User } from "@prisma/client";
import ModalClient from "./modalclient";

interface ModalServerPermissionProps{
  users: User[];
  openPermission: boolean;
  setOpenPermission: (open: boolean) => void
  user: User;
}

export default function ModalServerPermission({users, openPermission, setOpenPermission, user}:ModalServerPermissionProps) {
  return <ModalClient openModal={openPermission} users={users} setOpenAuthorize={setOpenPermission} user={user}/>;
}
