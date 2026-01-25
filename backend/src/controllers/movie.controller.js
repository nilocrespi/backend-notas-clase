import {Movie} from "../models/movie.model.js"

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find().sort({year:-1})
        res.json({success: true, data: movies})
    } catch (error) {
        res.status(500).json({success: false, error: "Error al traer peliculas"})
    }
}

const createMovie = async (req, res) => {
    try {
        const body = req.body
        const {title, year, genre, rating, director} = body

        if (!title) {
            return res.status(400).json({success: false, error: "Data invalida, vuelve a intentarlo"})
        }

        const createdMovie = await Movie.create ({title, year, genre, rating, director})

        res.status(201).json({ success: true, data: createdMovie })
    } catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
}

const updateMovie = async (req, res) => {
    try {
        const id = req.params.id
        const updates = req.body

        const updatedMovie = await Movie.findByIdAndUpdate (id, updates, { new: true })

        if (!updatedMovie) {
            return res.status(404).json({success: false, error: "no existe pelicula para actualizar"})
        }

        res.json ({success: true, data: updatedMovie})
    } catch (error) {
        return res.status(500).json({success: false, error: error.message})
    }
}

const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id
        const deletedMovie = await Movie.findByIdAndDelete (id)

        if (!deletedMovie) {
            return res.status(404).json ({success: false, error: "no existe pelicula para eliminar"})
        }

        res.json({success: true, data: deletedMovie})
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(400).json({success: false, error: "ID incorrecto, ingresa un valor valido"})
        }
        res.status(500).json({success: false, error: error.message})
    }
}

export {getMovies, createMovie, updateMovie, deleteMovie}