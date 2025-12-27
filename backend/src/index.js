import {getMovies, createMovie, deleteMovie} from "./controllers/movie.controller.js"
import express from "express"
import cors from "cors"

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

const port = 50000

app.listen (port, () => {
    console.log(`servidor en escucha en el puerto http://127.0.0.1.${port}`)
})


