import {Router} from "express"
import {register} from "../controllers/auth.controller.js"

const authRouter = Router()

// detectar peticion de registro de user

authRouter.post("/register", register)

// detectar peticion login





export {authRouter}