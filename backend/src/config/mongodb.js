import {connect} from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const URI_DB = process.env.URI_DB

const connectDB = async () => {
  try {
    await connect(URI_DB)
    console.log("✅ Conectado con éxito a mongo!")
  } catch (error) {
    console.log("❌ No se pudo conectar con la base de datos :(")
    process.exit(1)
  }
}

export {connectDB}