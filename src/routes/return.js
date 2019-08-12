const express = require('express')
const Route = express.Router()

const ReturnController = require('../controllers/return')

Route
  .get('/', ReturnController.getAllRentedBook)
  .patch('/:id', ReturnController.returnBook)

module.exports = Route