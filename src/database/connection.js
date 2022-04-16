const { connect } = require('mongoose')

// Conexion DB
const initDatabase = async () => {
  try {
    await connect(process.env.DB_URI)
    console.log('DB conectada')
  } catch (err) {
    console.log(err)
  }
}

module.exports = initDatabase