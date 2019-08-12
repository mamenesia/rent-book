const express = require('express')
const Route = express.Router()

const GenreController = require('../controllers/genres')

Route
  .get('/', GenreController.getGenres)
  .post('/', GenreController.insertGenre)
  .patch('/:id', GenreController.updateGenre)
  .delete('/:id', GenreController.deleteGenre)

module.exports = Route