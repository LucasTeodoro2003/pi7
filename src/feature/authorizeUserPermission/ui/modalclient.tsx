import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { User } from "@prisma/client";
import { updatePermissionUser } from "@/shared/lib/actionsUpdatePermissionUser";

interface ModalPermissionPromp {
  openModal: boolean;
  users: User[];
  setOpenAuthorize: (open: boolean) => void;
  user: User;
}

export default function ModalPermission({
  openModal,
  users,
  user,
  setOpenAuthorize,
}: ModalPermissionPromp) {
  const user1 = user.id
  const usersRequest = users.filter(
    (user) => user.description && user.id !== user1
  );

  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedPermission, setSelectedPermission] = useState<string>("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUser) return alert("Selecione um usuário!");
    setIsSubmitting(true);
    try {
      await updatePermissionUser([selectedUser], Number(selectedPermission));
      setOpenAuthorize(false);
    } catch (err) {
      alert("Erro ao atualizar");
    }
    alert("Atualizado com Sucesso")
    setIsSubmitting(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenAuthorize}>
      <DialogContent className="sm:max-w-[425px] max-w-[90%] rounded-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>ADMINISTRAR USUÁRIOS</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label className="mb-2 block">Selecione o usuário:</Label>
            <div className="max-h-48 overflow-auto border rounded px-2 py-1 space-y-2">
              {usersRequest.length === 0 && (
                <span className="text-gray-400">
                  Nenhuma solicitação pendente de autorização.
                </span>
              )}
              {usersRequest.map((user) => (
                <label key={user.id} className="flex items-center gap-2 border-b pb-1 last:border-b-0 cursor-pointer">
                  <input
                    type="radio"
                    name="selectedUser"
                    value={user.id}
                    checked={selectedUser === user.id}
                    onChange={() => setSelectedUser(user.id)}
                    className="accent-sky-600"
                  />
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-gray-500">
                    ({user.email}, {user.description})
                  </span>
                  {user.image && (
                    <img
                      src={user.image}
                      alt={user.name + user.id}
                      className="inline ml-2 h-8 w-8 object-cover rounded border"
                    />
                  )}
                </label>
              ))}
            </div>
            <div className="mt-4 flex flex-col">
              <Label htmlFor="permission" className="mb-1 font-medium">
                Permissão
              </Label>
              <select
                id="permission"
                name="permission"
                value={selectedPermission}
                onChange={(e) => setSelectedPermission(e.target.value)}
                className="border rounded px-2 py-1"
                required
              >
                <option value="1">Usuário</option>
                <option value="2">Gerenciador</option>
                <option value="3">Administrador</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={!selectedUser || isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}