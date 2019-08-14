// Route for /books
const express = require('express')
const Route = express.Router()
const verifyToken = require('../middleware/verifyToken')
const BookController = require('../controllers/books')

Route
  // Books CRUD 
  .get('/', verifyToken, BookController.getBooks)
  .post('/', BookController.insertBook)
  .patch('/:id', BookController.updateBook)
  .delete('/:id', BookController.deleteBook)
  // Rent book
  .get('/rent', BookController.getAvailableBooks)
  .patch('/rent/:id', BookController.rentBook)
  // Return Book
  .get('/return', BookController.getAllRentedBook)
  .patch('/return/:id', BookController.returnBook)
  // Genre CRUD
  .get('/genre', BookController.getGenres)
  .post('/genre', BookController.insertGenre)
  .patch('/genre/:id', BookController.updateGenre)
  .delete('/genre/:id', BookController.deleteGenre)


module.exports = Route