// Import objeto EXPRESS para obtener el objeto de aplicacion
const express = require('express')

// Iniciado el objeto de aplicacion
const app = express()

// Defino las configuraciones para rutas
// Uso express.json() para que EXPRESS pueda tratar datos en forma JSON
app.use(express.json())

// probar servidor
app.get('/', (req, res) => {
  res.send('Hello world')
})

// RUTAS
app.use('/movies', require('./src/routes/movies'))

module.exports = app