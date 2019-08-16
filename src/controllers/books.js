require('dotenv').config()
const conn = require('../configs/db')
const modelBooks = require('../models/books')
const verifyToken = require('../middleware/verifyToken')
const jwt = require('jsonwebtoken')


module.exports = {
  getBooks: (req, res) => {
    const numPerPage = parseInt(req.query.item) || 3
    let activePage = req.query.page || 1
    let beginData = numPerPage * (activePage - 1)
    let sort = req.query.sort || 'released_at'
    let order = req.query.order || 'DESC'
    let search = req.query.search || null
    let querySearch = (search !== null) ? `AND book.title LIKE '%${search}%'` : ''

    modelBooks.getBooks(beginData, numPerPage, sort, order, querySearch)
      .then(result => res.json({
        status: 200,
        result
      }))
      .catch(err => console.log(err))
  },
  getABook: (req, res) => {
    let id = req.params.id
    modelBooks.getABook(id)
      .then(result => {
        // Checking if book does not exist
        if (result[0] === undefined) {
          return res.status(400).send({
            status: 400,
            message: 'The book does not exist'
          })
        }
        res.json(result)
      })
      .catch(err => console.log(err))
  },
  insertBook: (req, res) => {
    // Checking if book already exist
    // const bookExist = conn.query('SELECT * FROM book WHERE title=?', req.body.title, (err, result) => {
    //   if (!err) {
    //     console.log(result[0])
    //     return result
    //   } else {
    //     return err
    //   }
    // })
    // if (bookExist[0] !== undefined) {
    //   return res.status(400).send({
    //     status: 400,
    //     message: 'The Book is already exist in DB'
    //   })
    // }

    const data = {
      title: req.body.title,
      desc: req.body.desc,
      image_url: req.body.image,
      released_at: new Date(req.body.date),
      genre: req.body.genre,
      available: req.body.available
    }

    modelBooks.insertBook(data)
      .then(result => res.send({
        status: 200,
        message: 'Book has successfully added!'
      }))
      .catch(err => console.log(err))
  },
  updateBook: (req, res) => {
    const data = {
      title: req.body.title,
      desc: req.body.desc,
      image_url: req.body.image,
      genre: req.body.genre
    }

    let id = req.params.id

    modelBooks.updateBook(data, id)
      .then(result => res.json({
        status: 200,
        message: 'Book has successfully updated',
        result
      }))
      .catch(err => console.log(err))
  },
  deleteBook: (req, res) => {
    let id = req.params.id
    modelBooks.deleteBook(id)
      .then(result => res.send({
        message: 'Book has been deleted',
        result: result
      }))
      .catch(err => console.log(err))
  },
  getAvailableBooks: (req, res) => {
    const numPerPage = parseInt(req.query.item) || 3
    let activePage = req.query.page || 1
    let beginData = numPerPage * (activePage - 1)
    let sort = req.query.sort || 'released_at'
    let order = req.query.order || 'DESC'
    let search = req.query.search || null
    let querySearch = (search !== null) ? `AND book.title LIKE '%${search}%'` : ''

    modelBooks.getAvailableBooks(beginData, numPerPage, sort, order, querySearch)
      .then(result => res.json({
        status: 200,
        message: 'This is the lists of available books',
        result
      }))
      .catch(err => console.log(err))
  },
  rentBook: async (req, res) => {
    const data = {
      available: 0
    }
    let id = req.params.id

    // Check if the book is not available
    const bookStatus = conn.query('SELECT * FROM book WHERE book_id=? AND available=0', id, (err, result) => {
      if (!err) {
        console.log(result)
        return result
      } else {
        return err
      }
    })

    if (bookStatus !== []) {
      return res.status(400).send({
        status: 400,
        message: 'The Book is already borrowed by someone else'
      })
    }

    modelBooks.rentBook(data, id)
      .then(result => res.json({
        status: 200,
        message: 'Book has successfully rented'
      }))
      .catch(err => console.log(err))
  },
  getAllRentedBook: (req, res) => {
    modelBooks.getAllRentedBook()
      .then(result => res.json({
        status: 200,
        message: 'This is the lists of unavailable books',
        result
      }))
      .catch(err => console.log(err))
  },
  returnBook: (req, res) => {
    const data = {
      available: 1
    }
    let id = req.params.id

    // Check if the book is available
    const bookAvailable = conn.query('SELECT * FROM book WHERE book_id=? AND available=1', id, (err, result) => {
      if (!err) {
        console.log(result)
        return result
      } else {
        return err
      }
    })
    if (bookAvailable !== []) {
      return res.status(400).send({
        status: 400,
        message: 'The Book is not borrowed by anyone, why are you trying to prank me ?'
      })
    }

    modelBooks.returnBook(data, id)
      .then(result => res.json({
        status: 200,
        message: 'Book has successfully returned'
      }))
      .catch(err => console.log(err))
  },
  getGenres: (req, res) => {
    modelBooks.getGenres()
      .then(result => res.json({
        status: 200,
        message: 'This is the lists of genres',
        result
      }))
      .catch(err => console.log(err))
  },
  insertGenre: (req, res) => {
    const data = {
      genre: req.body.genre
    }

    // Check if the genre already exist in DB
    let genreCheck = conn.query('SELECT * FROM genre WHERE genre=?', req.body.genre, (err, result) => {
      if (!err) {
        console.log(result)
        return result
      } else {
        return err
      }
    })

    if (genreCheck[0] !== undefined) {
      return res.status(400).send({
        status: 400,
        message: 'Genre has already exist'
      })
    }

    modelBooks.insertGenre(data)
      .then(result => res.json({
        status: 200,
        message: 'Genre has successfully added',
        result
      }))
      .catch(err => console.log(err))
  },
  updateGenre: (req, res) => {
    const data = {
      genre: req.body.genre
    }

    let id = req.params.id
    modelBooks.updateGenre(data, id)
      .then(result => res.json({
        status: 200,
        message: 'Genre has successfully updated',
        result
      }))
      .catch(err => console.log(err))
  },
  deleteGenre: (req, res) => {
    let id = req.params.id
    modelBooks.deleteGenre(id)
      .then(result => res.json({
        status: 200,
        message: 'Genre has been deleted',
        result
      }))
      .catch(err => console.log(err))
  }
}