const $section = document.querySelector("section");
const $form = document.querySelector("form");
const $title = document.getElementById("title");
const $year = document.getElementById("year");
const $genre = document.getElementById("genre");
const $rating = document.getElementById("rating");
const $director = document.getElementById("director");
const $btnSubmit = document.getElementById("btn-submit")
const $btnCancel = document.getElementById("btn-cancel")

let movies = []

let isEditing = false
let idMovieEditing = null

const renderMovies = async () => {
    const response = await fetch ("http://localhost:50000/movies", {
        method: "GET"
    })
    
    movies = await response.json()

    $section.innerHTML = ""

    movies.forEach ((movie) => {
        const { title, year, genre, rating, director, _id } = movie

        /*let textStock

        if (rating = "") {
            textStock = "sin rating"
        } else {
            textStock = `${rating} puntos`
        }*/


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
}

renderMovies()

// controlar el evento

// definir la funcion controladora del submit
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

    console.log(dataMovie)
    
    // method: POST
    // url: /products

    // ✅ avisar que tipo de dato le voy a enviar (json)
    // ⌚ enviarle la data en formato json

    // peticion al backend
    const response = await fetch("http://localhost:50000/movies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataMovie)
    })

    const createdMovie = await response.json()

    alert(`Pelicula agregada con exito, id: ${createdMovie._id}`)

    renderMovies()

    // limpiar formulario

    $form.reset()

    // o tambien puede ser:
    /* 
    $title.value = ""
    $year.value = ""
    $genre.value = ""
    $rating.value = ""
    $director.value = ""
    */
}

const deleteMovie = async (id) => {
    const confirmacion = confirm ("estas seguro que queres borrar la pelicula?")

    if (!confirmacion) {
        return
    }

    console.log(`http://localhost:50000/movies/${id}`)


    try {
        const res = await fetch(`http://localhost:50000/movies/${id}`, { method: "DELETE" })
        const movie = await res.json()

        alert (
            `
            se borro la pelicula ${movie.title},
            ID: ${movie._id}
            `
        )
        renderMovies()
    } catch (error) {
        console.error("no se pudo borrar la pelicula")
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
                "Content-Type": "application/json" // te estoy mandando un json 😎
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