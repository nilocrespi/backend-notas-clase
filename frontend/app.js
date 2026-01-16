//Referencia a elementos HTML
const $form = document.querySelector("form");
const $title = document.getElementById("title");
const $year = document.getElementById("year");
const $genre = document.getElementById("genre");
const $rating = document.getElementById("rating");
const $director = document.getElementById("director");

const $section = document.querySelector("section");

const $btnSubmit = document.getElementById("btn-submit")
const $btnCancel = document.getElementById("btn-cancel")

// estados globales 
// variables globales
let movies = []
let isEditing = false
let idMovieEditing = null
let error = null


const renderMovies = async () => {
    try {
        const respuestaDelServidor = await fetch ("http://localhost:50000/movies", {
            method: "GET"
        })

        let responseData = await respuestaDelServidor.json()

        movies = responseData.data

        $section.innerHTML = ""

        movies.forEach((movie) => {
            const { title, year, genre, rating, director, _id } = movie

            $section.innerHTML += 
                `<div>
                    <h3>Title: ${title}</h3>
                    <p>Year: ${year}</p>
                    <p>Genre: ${genre}</p>
                    <p>Rating: ${rating}</p>
                    <p>Director: ${director}</p>
                    <button onclick="handleEditingMovie('${_id}')">Actualizar</button>
                    <button onclick="deleteMovie('${_id}')">Borrar</button>
                </div>`
        })
    } catch (e) {
        error = "Error al traer peliculas, el servidor no responde"
        alert (error)
    }
}

renderMovies()

$form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (!isEditing) {
        addMovie()
    } else {
    const updates = {
        title: $title.value,
        year: Number($year.value),
        genre: $genre.value,
        rating: Number($rating.value),
        director: $director.value
    }

    updateMovie(updates)
  }
})

$btnCancel.addEventListener("click", () => {
    initializateStates()
})

const addMovie = async () => {
    const dataMovie = {
        title: $title.value,
        year: Number($year.value),
        genre: $genre.value,
        rating: Number($rating.value),
        director: $director.value
    }

    if(!$title.value || !$year.value || !$genre.value || !$rating.value || !$director.value) {
        alert ("debes completar el formulario")
        return
    }

    const response = await fetch("http://localhost:50000/movies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataMovie)
    })

    const responseData = await response.json()
    const createdMovie = responseData.data

    alert(`Pelicula agregada con exito, id: ${createdMovie._id}`)

    renderMovies()
    $form.reset()
}

const deleteMovie = async (id) => {
    const confirmacion = confirm("estas seguro que queres borrar la pelicula?")

    if (!confirmacion) {
        return
    }

    try {
        const res = await fetch(`http://localhost:50000/movies/${id}`, { method: "DELETE" })
        const responseData = await res.json()
        const deletedMovie = responseData.data

        alert (
            `
            se borro la pelicula ${deletedMovie.title},
            ID: ${deletedMovie._id}
            `
        )
        renderMovies()
    } catch (error) {
        console.error("No se pudo borrar la pelicula")
    }
}

const handleEditingMovie = async (id) => {
    isEditing = true
    idMovieEditing = id
    $btnCancel.style.display = "block"

    $btnSubmit.textContent = "Editar pelicula"
    const foundMovie = movies.find(m => m._id === id)
    const { title, year, genre, rating, director } = foundMovie

    $title.value = title
    $year.value = year
    $genre.value = genre
    $rating.value = rating
    $director.value = director
}

const updateMovie = async (updatedData) => {
    const res = await fetch (`http://localhost:50000/movies/${idMovieEditing}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify (updatedData)
        }
    )

    if (!res.ok) {
        alert ("No se puede actualizar")
        return
    }

    const dataUpdatedMovie = await res.json()

    alert(`Pelicula actualizada ID: ${dataUpdatedMovie._id}`)
    renderMovies()
    initializateStates()
}

const initializateStates = () => {
    $form.reset()
    $btnCancel.style.display = "none"
    $btnSubmit.textContent = "Agregar pelicula"
    idMovieEditing = null
    isEditing = false
}