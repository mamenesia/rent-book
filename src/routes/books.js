const express = require('express')
const Route = express.Router()

const BookController = require('../controllers/books')

Route
  .get('/', BookController.getBooks)
  .post('/', BookController.insertBook)
  .patch('/:id', BookController.updateBook)
  .delete('/:id', BookController.deleteBook)
  .get('/sort-by-title', BookController.sortByTitle)
  .get('/sort-by-date', BookController.sortByDate)
  .get('/sort-by-genre', BookController.sortByGenre)
  .get('/search/:q', BookController.searchBook)

module.exports = Route