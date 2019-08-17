// Route for /books
const express = require('express')
const Route = express.Router()
const verify = require('../middleware/verifyToken')
const BookController = require('../controllers/books')

Route
  // Books CRUD 
  .get('/', BookController.getBooks)
  .get('/show/:id', BookController.getABook)
  .post('/', verify, BookController.insertBook)
  .patch('/:id', verify, BookController.updateBook)
  .delete('/:id', verify, BookController.deleteBook)
  // Rent book
  .get('/rent', verify, BookController.getAvailableBooks)
  .patch('/rent/:id', verify, BookController.rentBook)
  // Return Book
  .get('/return', verify, BookController.getAllRentedBook)
  .patch('/return/:id', verify, BookController.returnBook)
  // Genre CRUD
  .get('/genre', BookController.getGenres)
  .post('/genre', verify, BookController.insertGenre)
  .patch('/genre/:id', verify, BookController.updateGenre)
  .delete('/genre/:id', verify, BookController.deleteGenre)

module.exports = Route