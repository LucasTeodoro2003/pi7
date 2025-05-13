import { z } from "zod";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Senha tem que ser no mínimo 8 caracteres"),
});

export { schema };
