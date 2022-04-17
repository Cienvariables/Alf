const router = require('express').Router() // Rutas
const Movie = require('../models/movies') // Schema
const errorHandler = require('../utils/errorHandler') // Error del servidor
const seedsMovies = require('../seeds/arrayMovies') //Array de Movies
module.exports = router // Preguntar esto y lo de abajo


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

//====> // y sin return, pq pq tiene try catch


// Obtener todas las pelis
router.get('/', async (req, res) => {
  const { title, director, year, genre } = req.query  //====>>  no es body, es que aunq no use params??

  try {
    const allMoviesList = await Movie.find()

    res.json({ message: 'Peliculas recibidas', movie: allMoviesList }) //====>> recuerdame que es movie

  } catch (err) {
    errorHandler(err, res)
  }
})


// Crear un endpoint **get** que devuelva una película según su **_id**
// get con query params
// router.get('/:id', async (req, res) => {
//   const moviesId = req.params.id

//   try {
//     const foundMovies = await Movie.findById(moviesId)

//     res.json({ message: 'Peliculas por id recibida', movie: foundMovies }) //====>> recuerdame que es movie

//   } catch (err) {
//     errorHandler(err, res)
//   }
// })


// 3. Crear un endpoint **get** que devuelva un valor por su titulo.
// router.get('/:title', async (req, res) => {

//   const moviesTitle = req.params.title

//   try {
//     const foundMovies = await Movie.findOne({ title: moviesTitle })

//     res.json({ message: 'Peliculas por titulo recibida', movie: foundMovies })                              //====>> recuerdame que es movie

//   } catch (err) {
//     errorHandler(err, res)
//   }
// })



// 3. Crear un endpoint **get** que devuelva un valor por su genero.
// router.get('/:genre', async (req, res) => {

//   const moviesGenre = req.params.genre

//   try {
//     const foundGenreMovies = await Movie.find({ genre: moviesGenre })

//     res.json({ message: 'Peliculas por genero recibida', movie: foundGenreMovies })                              //====>> recuerdame que es movie

//   } catch (err) {
//     errorHandler(err, res)
//   }
// })

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


// Crear un endpoint get que devuelva las películas que se han estrenado a partir de 2010
router.get('/character/year/:year', async (req, res) => {

  const { year } = req.params;

  try {
    const moviesByYear = await Character.find({ year: { $gte: year } });
    return res.status(200).json({ moviesByYear })
  } catch (err) {
    return res.status(500).json(err);
  }
});


router.get('/character/age/:age', async (req, res) => {
  const { age } = req.params;

  try {
    const characterByAge = await Character.find({ age: { $gt: age } });
    return res.status(200).json(characterByAge);
  } catch (err) {
    errorHandler(err, res)
  }
});
// -Usando (**$gt**) mayores de
// - Si usamos **$lt (less than)** encontraremos valores menores al que usemos.
// - Si usamos **$lte (less than equal)** encontraremos valores menores o igual al usado.
// - Si usamos **$gt (greater than)** encontraremos los valores mayores al usado.
// - Si usamos **$gte (greater than equal)** encontraremos los valores mayores e iguales al usado.