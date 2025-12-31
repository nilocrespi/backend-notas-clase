import {getMovies, createMovie, deleteMovie, updateMovie} from "./controllers/movie.controller.js"
import express from "express"
import cors from "cors"
import {connectDB} from "../src/config/mongodb.js"

// servidor http
const app = express ()
app.use (cors ())
// Habilita la posibilidad de recibir obj json desde el front
app.use (express.json ())

// callback
//ENDPOINT para obtener lista de elementos
app.get("/movies",async (req, res) => {
    const movies = await getMovies ()
    res.send(movies)
})

//ENDPOINT para agregar elemento
app.post("/movies", async (req, res) => {
    // req -> request -> información del cliente
    const body = req.body

    // destructuring para poder validar cada propiedad por separado
    const {title, year, genre, rating, director} = body

    // validar que me manda el frontend
    const createdMovie = await createMovie({ title, year, genre, rating, director })
    res.json(createdMovie)
})

// definir puertos (hay de 0 a 65535)

//ENDPOINT para borrar elemento
app.delete("/movies/:id", async (req, res) => {
    const id = req.params.id
    const deletedMovie = await deleteMovie(id)
    res.json (deletedMovie)
})

app.patch("/movies/:id", async (req, res) => {
  const id = req.params.id
  const body = req.body
  const updatedMovie = await updateMovie(id, body)
  res.json(updatedMovie)
})

const port = 50000

app.listen (port, () => {
    console.log(`servidor en escucha en el puerto http://127.0.0.1.${port}`)
    connectDB()
})


