import { Router } from "express"
import { getMovies, createMovie, updateMovie, deleteMovie } from "../controllers/movie.controller.js"

const movieRouter = Router()

// todas las peticiones que ingresan a productRouter, empiezan con: http://localhost:50000/movies/
// PATCH http://localhost:50000/movies/696047065af1ccda8cdaf5a2
movieRouter.get("/", getMovies)
movieRouter.post("/", createMovie)

movieRouter.patch("/:id", async (req, res) => {
    const id = req.params.id
    const body = req.body
    const response = await updateMovie(id, body)
    if (!response.success) {
        return res.status (400).json({success: false, error:response.error})
    }
    res.json(response)
})


movieRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    const response = await deleteMovie(id)
    if (!response.success) {
        return res.status(400).json(response)
    }
    res.status(200).json(response)
})

export { movieRouter }