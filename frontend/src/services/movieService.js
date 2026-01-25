const movieService = {
  async getMovies() {
    try {
      const response = await fetch("http://localhost:50000/movies", {
        method: "GET"
      });
      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      throw new Error("Error al traer peliculas, el servidor no responde");
    }
  },

  async addMovie(dataMovie) {
    const response = await fetch("http://localhost:50000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataMovie)
    });
    const responseData = await response.json();
    return responseData.data;
  },

  async updateMovie(id, updatedData) {
    const res = await fetch(`http://localhost:50000/movies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    });

    if (!res.ok) {
      throw new Error("No se puede actualizar");
    }

    const dataUpdatedMovie = await res.json();
    return dataUpdatedMovie.data;
  },

  async deleteMovie(id) {
    const res = await fetch(`http://localhost:50000/movies/${id}`, { 
      method: "DELETE" 
    });
    const responseData = await res.json();
    return responseData.data;
  }
};

export default movieService;