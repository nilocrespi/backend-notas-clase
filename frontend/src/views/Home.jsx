import React, { useState, useEffect } from 'react';
import MovieForm from "../components/MovieForm";
import MovieList from '../components/MovieList';
import movieService from '../services/movieService';
import '../styles/Home.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const moviesData = await movieService.getMovies();
      setMovies(moviesData);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddMovie = async (dataMovie) => {
    try {
      const createdMovie = await movieService.addMovie(dataMovie);
      alert(`Pelicula agregada con exito, id: ${createdMovie._id}`);
      loadMovies();
    } catch (error) {
      alert("Error al agregar película");
    }
  };

  const handleUpdateMovie = async (updatedData) => {
    try {
      const updatedMovie = await movieService.updateMovie(editingMovie._id, updatedData);
      alert(`Pelicula actualizada ID: ${updatedMovie._id}`);
      loadMovies();
      setEditingMovie(null);
    } catch (error) {
      alert("No se puede actualizar");
    }
  };

  const handleDeleteMovie = async (id) => {
    const confirmacion = window.confirm("estas seguro que queres borrar la pelicula?");

    if (!confirmacion) {
      return;
    }

    try {
      const deletedMovie = await movieService.deleteMovie(id);
      alert(`se borro la pelicula ${deletedMovie.title}, ID: ${deletedMovie._id}`);
      loadMovies();
    } catch (error) {
      console.error("No se pudo borrar la pelicula");
      alert("Error al borrar película");
    }
  };

  const handleEditingMovie = (id) => {
    const foundMovie = movies.find(m => m._id === id);
    setEditingMovie(foundMovie);
  };

  const handleFormSubmit = (dataMovie) => {
    if (editingMovie) {
      handleUpdateMovie(dataMovie);
    } else {
      handleAddMovie(dataMovie);
    }
  };

  const handleCancelEdit = () => {
    setEditingMovie(null);
  };

  return (
    <div className="app-container">
      <h1>Lista de peliculas</h1>
      
      <MovieForm 
        onSubmit={handleFormSubmit}
        onCancel={handleCancelEdit}
        editingMovie={editingMovie}
      />

      <MovieList 
        movies={movies}
        onEdit={handleEditingMovie}
        onDelete={handleDeleteMovie}
      />
    </div>
  );
}

export default App;