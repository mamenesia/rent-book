const express = require('express')
const Route = express.Router()

const RentController = require('../controllers/rent')

Route
  .get('/', RentController.getAvailableBooks)
  .patch('/:id', RentController.rentBook)


module.exports = Route