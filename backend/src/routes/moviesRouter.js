import { Router } from "express"
import { getMovies, createMovie, updateMovie, deleteMovie } from "../controllers/movie.controller.js"

const movieRouter = Router()

// todas las peticiones que ingresan a productRouter, empiezan con: http://localhost:50000/movies/
// PATCH http://localhost:50000/movies/696047065af1ccda8cdaf5a2
movieRouter.get("/", getMovies)
movieRouter.post("/", createMovie)
movieRouter.patch("/:id", updateMovie)
movieRouter.delete("/:id", deleteMovie)

export { movieRouter }