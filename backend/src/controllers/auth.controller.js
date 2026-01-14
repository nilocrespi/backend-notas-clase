import {User} from "../models/user.model.js"
import bcryptjs from "bcryptjs"

/*
toma el input del user
sanitiza los datos
responde al usuario (exito o no exito)
el controlador resuelve la logica de negocio
*/
const register = async (req,res) => {
    try {
        const data = req.body

        const {email, password} = data


        // implementar validaciones de imput con ZOD
        if (!email || !password) {
            return res.status(400).json ({success: false, error: "data invalida, revisa los datos ingresados"})
        }

        if (!email.includes("@")) {
            return res.status(400).json ({success: false, error: "correo electronico invalido"})
        }

        if (password.length < 4) {
            return res.status(400).json ({success: false, error: "la contraseña debe contar al menos con 4 caracteres"})
        }

        //ENCRIPTACION DE CONTRASEÑA CON BCRYPTJS, toma un texto plano y encripta el valor 10 veces
        const hash = await bcryptjs.hash(password,10)

        const newDataUser = {
            email: email,
            password: hash
        }

        const newUser = await User.create (newDataUser)
        res.status(201).json({ success: true, data: newUser})
    } catch (error) {
        res.json({ success: false, error: error.message})
    }
}

export {register}