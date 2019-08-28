// Route for /books
const express = require('express')
const cors = require('cors')
const app = express()
const Route = express.Router()
const verify = require('../middleware/verifyToken')
const BookController = require('../controllers/books')

app.use(cors())
Route
  // Books CRUD 
  .get('/', cors(), BookController.getBooks)
  .get('/show/:id', BookController.getABook)
  .post('/',  BookController.insertBook)
  .patch('/:id',  BookController.updateBook)
  .delete('/:id',  BookController.deleteBook)
  // Rent book
  .get('/rent', BookController.getAvailableBooks)
  .patch('/rent/:id', BookController.rentBook)
  // Return Book
  .get('/return', BookController.getAllRentedBook)
  .patch('/return/:id', BookController.returnBook)
  // Genre CRUD
  .get('/genre', BookController.getGenres)
  .post('/genre',  BookController.insertGenre)
  .patch('/genre/:id',  BookController.updateGenre)
  .delete('/genre/:id',  BookController.deleteGenre)

module.exports = Route