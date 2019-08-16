require('dotenv').config()
const conn = require('../configs/db')
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
    if (error) return res.status(400).send({
      status: 400,
      message: error.details[0].message
    })

    // Checking if the username  is already in the db
    const usernameCheck = conn.query(`SELECT * FROM user WHERE username=?`, req.body.username, (err, result) => {
      if (!err) {
        return result
      } else {
        return err
      }
    })
    if (usernameCheck === []) return res.status(400).send({
      status: 400,
      message: 'Username is already exist!'
    })

    // Checking if the username  is already in the db
    const emailCheck = conn.query('SELECT * FROM user WHERE email=?', req.body.email, (err, result) => {
      if (!err) {
        return result
      } else {
        return err
      }
    })
    if (emailCheck === []) return res.status(400).send({
      status: 400,
      message: 'Email is already registered'
    })

    // Hash the password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    // if register data valid, proceed to insert user data to db
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    }
    modelAuth.registerUser(data)
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
  },
  loginUser: (req, res) => {
    // Validate login data
    const {
      error
    } = loginValidation(req.body)
    if (error) return res.status(400).send({
      status: 400,
      message: error.details[0].message
    })

    const data = {
      username: req.body.username,
      password: req.body.password
    }

    modelAuth.loginUser(data)
      .then(result => {
        // check hashed password
        const validPassword = bcrypt.compareSync(req.body.password, result[0].password)
        if (!validPassword) return res.send({
          status: 400,
          message: 'Wrong Password!'
        })
        // Create and assign token
        const token = jwt.sign({
          username: result[0].username
        }, process.env.TOKEN_SECRET)

        res.header('Authorization', token).send({
          status: 200,
          message: 'Login successfully!',
          token
        })

      })
      .catch(err => res.send({
        status: 400,
        message: 'Username does not exist'
      }))
  }
}