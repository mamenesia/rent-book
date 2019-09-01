require('dotenv').config()

const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
const AuthRoute = require('./src/routes/auth')
const BookRoute = require('./src/routes/books')
const cors = require('cors');
const serverPOST = 3306
const PORT = process.env.PORT || serverPOST;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(cors())
// Middleware Route
// Route for homepage, register and login
app.use('/', AuthRoute)
// Route for API
app.use('/books', BookRoute)
// 