require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', router)

//the very last because it ends the req
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
      await sequelize.authenticate()
      sequelize.sync()

      app.listen(PORT,() =>{
        console.log(`Server started on port: ${PORT}`)
      })
  } catch (error) {
      console.log(error)
  }
}

start()

