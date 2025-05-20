import { executeActionDB } from "./executeActionDB";
import db from "./prisma";
import { schema } from "./schema";
import bcrypt from "bcryptjs";

const signUp = async (formData: FormData) => {
  return executeActionDB({
    actionFn: async () => {
      const email = formData.get("email");
      const password = formData.get("password");
      const { error, data: validateData } = schema.safeParse({
        email,
        password,
      });
      if (error) {
        const flattened = error.flatten();
        const errors = [
          ...(flattened.fieldErrors.email || []),
          ...(flattened.fieldErrors.password || []),
        ];
        throw new Error(errors.join(", "));
      }
      try {
        const hash = bcrypt.hashSync(validateData.password, 10);
        await db.user.create({
          data: {
            email: validateData.email.toLocaleLowerCase(),
            password: hash,
            permission: 3, //Usuario so Olhar 3 - Usuario Criar Produtos 2 - Usuario Administrador 1
          },
        });
      } catch (err:any) {
        if(err.code === "P2002"){
          throw new Error("Email já Cadastrado!");
        }else{
          throw new Error("Desconhecido - Erro: ", err.code)
        }
      }
    },
  });
};

export { signUp };
