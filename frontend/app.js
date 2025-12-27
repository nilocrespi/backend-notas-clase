const $section = document.querySelector("section");
const $form = document.querySelector("form");
const $title = document.getElementById("title");
const $year = document.getElementById("year");
const $genre = document.getElementById("genre");
const $rating = document.getElementById("rating");
const $director = document.getElementById("director");



const renderMovies = async () => {
    const response = await fetch ("http://localhost:50000/movies")
    const movies = await response.json()

    $section.innerHTML = ""

    movies.forEach ((movie) => {
        $section.innerHTML += 
            `<div>
                <h3>Title: ${movie.title}</h3>
                <p>Year: ${movie.year}</p>
                <p>Genre: ${movie.genre}</p>
                <p>Rating: ${movie.rating}</p>
                <p>Director: ${movie.director}</p>
                <button>Actualizar</button>
                <button>Borrar</button>
            </div>`
    })
}

renderMovies()

$form.addEventListener("submit", async (e) => {
    e.preventDefault()

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

    const data = await response.json()

    alert(`Pelicula agregada con exito, id: ${data._id}`)

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
})

