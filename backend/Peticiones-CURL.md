## Peticiones CURL

#### Peticion curl para obtener peliculas
curl http://localhost:50000/movies

#### Peticion curl para agregar pelicula
curl -X POST http://localhost:50000/movies \
-H "Content-Type: application/json" \
-d '{* json *}'

#### Peticion curl para modificar pelicula
curl -X PATCH http://localhost:50000/movies/ **ACA VA EL ID** \
-H "Content-Type: application/json" \
-d '{* json modificado *}'

#### Peticion curl para eliminar pelicula
curl -X DELETE http://localhost:50000/movies/ **ACA VA EL ID**