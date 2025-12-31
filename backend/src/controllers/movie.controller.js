import {connectDB} from "../config/mongodb.js"
import {Movie} from "../models/movie.model.js"

const getMovies = async () => {
    const movies = await Movie.find().sort({year:-1})
    return movies
}

// getMovies()

const createMovie = async (data) => {
    const createdMovie = await Movie.create (data)
    return createdMovie
}

/*
createMovie({
    title: "Bugonia",
    year: 2025,
    genre: "Sci-Fi",
    rating: 2.0,
    director: "Yorgos Lanthimos"
})
*/

const updateMovie = async (id, updates) => {
    const updatedMovie = await Movie.findByIdAndUpdate (id, updates, {new: true})
    return (updatedMovie)
}

// updateMovie("6938c50570dbb5a0dc7b0bb7", {rating: 1.0})

const deleteMovie = async (id) => {
    const deletedMovie = await Movie.findByIdAndDelete (id)
    return deletedMovie
}

// deleteMovie("6938c50570dbb5a0dc7b0bb7")

export {getMovies, createMovie, updateMovie, deleteMovie}