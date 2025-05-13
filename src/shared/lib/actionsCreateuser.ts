import { executeActionDB } from "./executeActionDB"
import db from "./prisma"
import { schema } from "./schema"
import bcrypt from "bcryptjs"

const signUp = async (formData: FormData) => {
    return executeActionDB({
        actionFn: async()=>{
            const email = formData.get("email")
            const password = formData.get("password")
            const validateData = schema.parse({email, password})
            const hash = bcrypt.hashSync(validateData.password, 10)
            await db.user.create({
                data:{
                    email: validateData.email.toLocaleLowerCase(),
                    password: hash,
                    permission: 3 //Usuario Normal 3 - Usuario Funcionario 2 - Usuario Administrador 1
                }
            })
        }
    })
} 

export {signUp};