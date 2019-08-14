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

    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403)
      } else {
        modelBooks.getBooks(beginData, numPerPage, sort, order, querySearch)
          .then(result => res.json(result))
          .catch(err => console.log(err))
      }
    })
  },
  insertBook: (req, res) => {
    const data = {
      title: req.body.title,
      desc: req.body.desc,
      image_url: req.body.image,
      released_at: new Date(),
      genre: req.body.genre,
      available: req.body.available
    }

    modelBooks.insertBook(data)
      .then(result => res.json(result))
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
      .then(result => res.json(result))
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
    modelBooks.getAvailableBooks()
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  rentBook: (req, res) => {
    const data = {
      available: 0
    }
    let id = req.params.id
    modelBooks.rentBook(data, id)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  getAllRentedBook: (req, res) => {
    modelBooks.getAllRentedBook()
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  returnBook: (req, res) => {
    const data = {
      available: 1
    }
    let id = req.params.id
    modelBooks.returnBook(data, id)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  getGenres: (req, res) => {
    modelBooks.getGenres()
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  insertGenre: (req, res) => {
    const data = {
      genre: req.body.genre
    }

    modelBooks.insertGenre(data)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  updateGenre: (req, res) => {
    const data = {
      genre: req.body.genre
    }

    let id = req.params.id
    modelBooks.updateGenre(data, id)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  deleteGenre: (req, res) => {
    let id = req.params.id
    modelBooks.deleteGenre(id)
      .then(result => res.send('Genre has been deleted', result))
      .catch(err => console.log(err))
  }
}