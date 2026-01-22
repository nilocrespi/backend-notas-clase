import express from "express"
import cors from "cors"
import {connectDB} from "../src/config/mongodb.js"
import {movieRouter} from "./routes/moviesRouter.js"
import {authRouter} from "./routes/authRouter.js"
import {authMiddleware} from "./middleware/authMiddleware.js"

const serverHttp = express()

serverHttp.use(cors())
serverHttp.use(express.json())

serverHttp.use("/movies", authMiddleware, movieRouter)
serverHttp.use("/auth", authRouter)
// si la peticion (cualquiera sea) empieza con /movies se las va a enviar al router
// serverHttp.use("/purchase", purchaseRouter)
// serverHttp.use("/clients", clientsRouter)

serverHttp.use((req, res) => {
    res.status(404).json({ success: false, error: "el recurso no se encuentra" })
})

const PORT = 50000

// 0 - 65656
serverHttp.listen(PORT, () => {
    console.log(`✅ Servidor http en escucha en el puerto http://127.0.0.1:${PORT}`)
    connectDB()
})