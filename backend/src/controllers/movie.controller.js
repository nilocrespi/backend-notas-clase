import {connectDB} from "../config/mongodb.js"
import {Movie} from "../models/movie.model.js"

const getMovies = async () => {
    connectDB()
    const movies = await Movie.find().sort({year:-1})
    return movies
}

// getMovies()

const createMovie = async (data) => {
    connectDB()
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
    connectDB()
    const updatedMovie = await Movie.findByIdAndUpdate (id, updates, {new: true})
    console.log (updatedMovie)
    process.exit(1)
}

// updateMovie("6938c50570dbb5a0dc7b0bb7", {rating: 1.0})

const deleteMovie = async (id) => {
    connectDB()
    const deletedMovie = await Movie.findByIdAndDelete (id)
    return deletedMovie
}

// deleteMovie("6938c50570dbb5a0dc7b0bb7")

export {getMovies, createMovie, updateMovie, deleteMovie}