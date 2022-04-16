
// Importo y ejecuto directamente la libreria para
// la lectura de variables de entorno (.env)
require('dotenv').config()

// Conexion DB
const initDatabase = require('./src/database/connection')
initDatabase()

// Importo la aplicacion de express
const app = require('./app')

// Levantamos el servidor
app.listen(process.env.PORT, () => {
  console.log(`Server listening at port: ${process.env.PORT}`)
})