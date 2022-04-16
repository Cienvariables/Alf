const router = require('express').Router() // Rutas
const Movie = require('../models/movies') // Schema
const errorHandler = require('../utils/errorHandler') // Error del servidor
const seedsMovies = require('../seeds/arrayMovies') //Array de Movies
module.exports = router // Preguntar Alfredo esto y lo de abajo


// Crear una peli
router.post('/', async (req, res) => {
  const { title, director, year, genre } = req.body

  try {
    const newMovie = new Movie(
      {
        title,
        director,
        year,
        genre
      })

    await newMovie.save()

    res.json({ message: 'Movie saved successfully', movie: newMovie })

  } catch (err) {
    errorHandler(err, res)
  }
})

// Listado de pelis post

const postSeeds = seedsMovies.map(movie => new Movie(movie))
const generateMoviesSeeds = async () => {
  try {
    const foundMovies = await Movie.find()

    if (foundMovies.length) {
      await Movie.collection.drop()
    }
    await Movie.insertMany(postSeeds)
    console.log('Movies añadidas');
  } catch (err) {
    console.log(err);
  }
}
generateMoviesSeeds();

//====> Alfredo // y sin return, pq pq tiene try catch


// 1. Crear un endpoint **get** que devuelva todas las películas.
// 2. Crear un endpoint **get** que devuelva una película según su **_id**
// 3. Crear un endpoint **get** que devuelva un valor por su titulo.
// 4. Crear un endpoint **get** que devuelva los documentos según su género.
// 5. Crear un endpoint **get** que devuelva las películas que se han estrenado a partir de 2010.


// Obtener todas las pelis
router.get('/', async (req, res) => {
  const { title, director, year, genre } = req.query  //====>> Alfredo no es body, es quey aunq no use params??

  try {
    const allMoviesList = await Movie.find()

    res.json({ message: 'Peliculas recibidas', movie: allMoviesList }) //====>> recuerdame que es movie

  } catch (err) {
    errorHandler(err, res)
  }
})


// Crear un endpoint **get** que devuelva una película según su **_id**
// get con query params
router.get('/:id', async (req, res) => {
  const moviesId = req.params.id

  try {
    const foundMovies = await Movie.findById(moviesId)

    res.json({ message: 'Peliculas por id recibida', movie: foundMovies }) //====>> recuerdame que es movie

  } catch (err) {
    errorHandler(err, res)
  }
})


// 3. Crear un endpoint **get** que devuelva un valor por su titulo.
router.get('/:title', async (req, res) => {

  const moviesTitle = req.params.title

  try {
    const foundMovies = await Movie.find(moviesTitle)

    res.json({ message: 'Peliculas por titulo recibida', movie: foundMovies }) //====>> recuerdame que es movie

  } catch (err) {
    errorHandler(err, res)
  }
})



// // Obtener una peli
// router.get('/:id', async (req, res) => {
//   const productId = req.params.id

//   try {
//     const foundProduct = await Product.findById(productId)

//     res.json({ message: 'Product retrieved successfully', product: foundProduct })

//   } catch (err) {
//     errorHandler(err, res)
//   }
// })



// // Actualizar una peli
// router.put('/:id', async (req, res) => {
//   const productId = req.params.id
//   const { name, description, price, type } = req.body

//   try {
//     const updatedProductData = {
//       name,
//       description,
//       price,
//       type
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true })

//     res.json({ message: 'Product updated successfully', product: updatedProduct })

//   } catch (err) {
//     errorHandler(err, res)
//   }

// })

// // Eliminar
// router.delete('/:id', async (req, res) => {
//   const productId = req.params.id

//   try {
//     const deletedProduct = await Product.findByIdAndDelete(productId)

//     res.json({ message: 'Product deleted successfully', product: deletedProduct })

//   } catch (err) {
//     errorHandler(err, res)
//   }
// })



// ----
// Proxima clase