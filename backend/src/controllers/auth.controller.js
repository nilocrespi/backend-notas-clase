import {User} from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES

/*
toma el input del user
sanitiza los datos
responde al usuario (exito o no exito)
el controlador resuelve la logica de negocio
*/
const register = async (req,res) => {
    try {
        const body = req.body

        const {email, password, username} = body

        // implementar validaciones de imput con ZOD
        if (!email || !password) {
            return res.status(400).json ({success: false, error: "data invalida, revisa los datos ingresados"})
        }

        if (!email.includes("@") || !email.endsWith(".com")) {
            return res.status(400).json ({success: false, error: "correo electronico invalido"})
        }

        if (password.length < 4) {
            return res.status(400).json ({success: false, error: "la contraseña debe contar al menos con 4 caracteres"})
        }

        //ENCRIPTACION DE CONTRASEÑA CON BCRYPTJS, toma un texto plano y encripta el valor 10 veces
        const hash = await bcryptjs.hash(password,10)

        const newDataUser = {
            username: username,
            email: email, //se puede simplificar poniendo solo "email"
            password: hash
        }

        const newUser = await User.create(newDataUser)

        res.status(201).json({success: true, data: {_id: newUser._id, username: newUser.username, email: newUser.email}})
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({success: false, error: "email ya existente en base de datos"})
        }
        res.status(500).json({success: false, error: error.message})
    }
}

const login = async (req, res) => {
    try {
        const body = req.body
        const {email, password} = body

        if (!email || !password) {
            return res.status(400).json({success: false, error: "data invalida, ingrese los datos requeridos"})
        }

        const foundUser = await User.findOne({email})

        if (!foundUser) {
            return res.status(401).json({success: false, error: "unauthorized"})
        }
        
        const validatePassword = await bcryptjs.compare(password, foundUser.password)

        if (!validatePassword) {
            return res.status(401).json({success:false, error: "unauthorized"})
        }

        //generar un token con libreria jsonwebtoken (jwt.io)

        const payload = {_id: foundUser._id, username: foundUser.username, email: foundUser.email}
        
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES })
        
        res.json({success: true, data: token})

    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

export {register, login}