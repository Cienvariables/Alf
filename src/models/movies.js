const { model, Schema } = require('mongoose')

// Esquema de peliculas
const moviesSchema = new Schema({//Schema define las propiedades y sus tipos.
  title: String,
  director: String,
  year: Number,
  genre: String,
})

const Movie = model('pelicula', moviesSchema)

module.exports = Movie

// Importo el Modelo,(con model) genero un objeto para poder interactuar con la DB
// el Modelo es un objeto particular que usa mongoose para poder interactuar con la DB,find, create,update..
// El modelo usa el Schema para poder manejarlo y provee esas propiedades adicionales.