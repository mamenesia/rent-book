// Route for /
const express = require('express')
const Route = express.Router()
const AuthController = require('../controllers/auth')
const jwt = require('jsonwebtoken')

const verifyToken = require('../middleware/verifyToken')

Route
  .get('/', (req, res) => {
    res.json({
      message: "Welcome to Rent Book Api"
    })
  })
  .post('/register', AuthController.registerUser)
  // .get('/register', AuthController.registerUser)
  .post('/login', AuthController.loginUser)
// .post('/posts', verifyToken, (req, res) => {
//   jwt.verify(req.token, 'secretkey', (err, authData) => {
//     if (err) {
//       res.sendStatus(403)
//     } else {
//       res.json({
//         message: 'Post has been created successfully',
//         authData
//       })
//     }
//   })
// })


module.exports = Route