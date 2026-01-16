import {connect} from "mongoose"

const URI_DB = "mongodb://localhost:27017/cinema"

const connectDB = async () => {
  try {
    await connect(URI_DB)
    console.log("✅ Conectado con éxito a mongo!")
  } catch (error) {
    console.log("❌ No se pudo conectar con la base de datos :(")
  }
}

export {connectDB}