// Route for /
const express = require('express')
const Route = express.Router()
const AuthController = require('../controllers/auth')

Route
  .get('/', (req, res) => {
    res.json({
      message: "Welcome to Rent Book Api",
      login: "If you already have an account, please login",
      register: "Register your account today to use Rent Book API"
    })
  })
  .post('/register', AuthController.registerUser)
  .post('/login', AuthController.loginUser)

module.exports = Route