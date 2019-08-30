require('dotenv').config()

const modelAuth = require('../models/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const {
  registerValidation,
  loginValidation
} = require('../middleware/validation')

module.exports = {
  registerUser: (req, res) => {
    // Validate register data
    const {
      error
    } = registerValidation(req.body)
    if (error) {
      return res.send({
        status: 400,
        message: error.details[0].message
      })
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    // if register data valid, proceed to insert user data to db
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    }

    // Check username or email already exist
    modelAuth.registerCheck(data)
      .then(result => {
        if (result.length === 0) {
          // Register the user
          return modelAuth.registerUser(data)
            .then(result => res.json({
              status: 200,
              message: 'The user is successfully registered!',
              user: {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
              }
            }))
            .catch(err => console.log(err))
        } else {
          // respond if username or email exist
          return res.status(400).send({
            status: 400,
            message: 'Username or Email already registered!'
          })
        }
      })
  },
  loginUser: (req, res) => {
    // Validate login data
    const {
      error
    } = loginValidation(req.body)
    if (error) {
      return res.status(400).send({
        status: 400,
        message: error.details[0].message
      })
    }
    const data = {
      username: req.body.username,
      password: req.body.password
    }

    modelAuth.loginUser(data)
      .then(result => {
        // check hashed password
        const validPassword = bcrypt.compareSync(req.body.password, result[0].password)
        if (!validPassword) {
          return res.send({
            status: 400,
            message: 'Wrong Password!'
          })
        }
        // Create and assign token
        const token = jwt.sign({
          id: result[0].id,
          username: result[0].username
        }, process.env.TOKEN_SECRET, {
          expiresIn: '10h'
        })
        // res.header('Authorization', token)
        res.send({
          status: 200,
          message: 'Login successfully!',
          username: result.username,
          password: result.password,
          token
        })
      })
      .catch(err => res.send({
        status: 400,
        message: 'Username does not exist'
      }))
  }
}