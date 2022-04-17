const router = require('express').Router() // Rutas
const Movie = require('../models/movies') // Schema
const errorHandler = require('../utils/errorHandler') // Error del servidor
module.exports = router // Preguntar esto y lo de abajo


// Crear un endpoint get que devuelva las películas que se han estrenado a partir de 2010
router.get('/year/:year', async (req, res) => {

  const { year } = req.params;

  try {
    const moviesByYear = await Movie.find({ year: { $gte: year } });
    return res.status(200).json({ moviesByYear })
  } catch (err) {
    errorHandler(err, res)
  }
});

// -Usando (**$gt**) mayores de
// - Si usamos **$lt (less than)** encontraremos valores menores al que usemos.
// - Si usamos **$lte (less than equal)** encontraremos valores menores o igual al usado.
// - Si usamos **$gt (greater than)** encontraremos los valores mayores al usado.
// - Si usamos **$gte (greater than equal)** encontraremos los valores mayores e iguales al usado.