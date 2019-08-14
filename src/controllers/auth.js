const modelAuth = require('../models/auth')
const jwt = require('jsonwebtoken')

module.exports = {
  registerUser: (req, res) => {
    res.send('User is registered')
  },
  loginUser: (req, res) => {
    // Mock user
    const user = {
      id: 1,
      username: 'dedy',
      email: 'dedy.prasetyo.h@gmail.com'
    }

    jwt.sign({
      user: user
    }, 'secretkey', (err, token) => {
      res.json({
        token: token
      })
    })
  }
}