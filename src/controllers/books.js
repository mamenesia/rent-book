require('dotenv').config()
const modelBooks = require('../models/books')

module.exports = {
  getBooks: (req, res) => {
    const numPerPage = parseInt(req.query.item) || 3
    const activePage = req.query.page || 1
    const beginData = numPerPage * (activePage - 1)
    const sort = req.query.sort || 'released_at'
    const order = req.query.order || 'DESC'
    const search = req.query.search || null
    const querySearch = (search !== null) ? `AND book.title LIKE '%${search}%'` : ''

    modelBooks.getBooks(beginData, numPerPage, sort, order, querySearch)
      .then(result => res.json({
        status: 200,
        result
      }))
      .catch(err => console.log(err))
  },
  getABook: (req, res) => {
    const id = req.params.id
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

    const id = req.params.id

    modelBooks.getABook(id)
      .then(result => {
        if (result.length !== 0) {
          return modelBooks.updateBook(data, id)
            .then(result => res.json({
              status: 200,
              message: 'Book has successfully updated',
              result
            }))
            .catch(err => {
              console.log(err)
            })
        } else {
          return res.status(400).send({
            status: 400,
            message: 'Book does not exist'
          })
        }
      })

  },
  deleteBook: (req, res) => {
    const id = req.params.id
    modelBooks.getABook(id)
      .then(result => {
        if (result.length !== 0) {
          return modelBooks.deleteBook(id)
            .then(result => res.send({
              message: 'Book has been deleted',
              result: result
            }))
            .catch(err => console.log(err))
        } else {
          return res.status(400).send({
            status: 400,
            message: 'Book does not exist'
          })
        }

      })
  },
  getAvailableBooks: (req, res) => {
    const numPerPage = parseInt(req.query.item) || 3
    const activePage = req.query.page || 1
    const beginData = numPerPage * (activePage - 1)
    const sort = req.query.sort || 'released_at'
    const order = req.query.order || 'DESC'
    const search = req.query.search || null
    const querySearch = (search !== null) ? `AND book.title LIKE '%${search}%'` : ''

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
    const id = req.params.id
    modelBooks.bookAvailable(id)
      .then(result => {
        if (result.length !== 0) {
          return modelBooks.rentBook(data, id)
            .then(result => res.json({
              status: 200,
              message: 'Book has successfully rented'
            }))
            .catch(err => console.log(err))
        } else {
          return res.status(400).send({
            status: 400,
            message: 'The book has already borrowed by someone else'
          })
        }
      })


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
    const id = req.params.id
    // Check if the book is available
    // const bookAvailable = conn.query('SELECT * FROM book WHERE book_id=? AND available=1', id, (err, result) => {
    //   if (!err) {
    //     console.log(result)
    //     return result
    //   } else {
    //     return err
    //   }
    // })
    // if (bookAvailable !== []) {
    //   return res.status(400).send({
    //     status: 400,
    //     message: 'The Book is not borrowed by anyone, why are you trying to prank me ?'
    //   })
    // }
    modelBooks.bookNotAvailable(id)
      .then(result => {
        if (result.length !== 0) {
          return modelBooks.returnBook(data, id)
            .then(result => res.json({
              status: 200,
              message: 'Book has successfully returned'
            }))
            .catch(err => console.log(err))
        } else {
          return res.status(400).send({
            status: 400,
            message: 'The Book is not borrowed by anyone, why are you trying to prank me ?'
          })
        }
      })
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
    // let genreCheck = conn.query('SELECT * FROM genre WHERE genre=?', req.body.genre, (err, result) => {
    //   if (!err) {
    //     console.log(result)
    //     return result
    //   } else {
    //     return err
    //   }
    // })

    // if (genreCheck[0] !== undefined) {
    //   return res.status(400).send({
    //     status: 400,
    //     message: 'Genre has already exist'
    //   })
    // }

    modelBooks.genreCheck(data)
      .then(result => {
        if (result.length === 0) {
          return modelBooks.insertGenre(data)
            .then(result => res.json({
              status: 200,
              message: 'Genre has successfully added'
            }))
            .catch(err => console.log(err))
        } else {
          return res.status(400).send({
            status: 400,
            message: 'The genre is already exist'
          })
        }
      })


  },
  updateGenre: (req, res) => {
    const data = {
      genre: req.body.genre
    }
    const id = req.params.id
    modelBooks.genreCheckById(id)
      .then(result => {
        if (result.length !== 0) {
          return modelBooks.updateGenre(data, id)
            .then(result => res.json({
              status: 200,
              message: 'Genre has successfully updated',
              result
            }))
            .catch(err => console.log(err))
        } else {
          return res.status(400).send({
            status: 400,
            message: 'Genre does not exist'
          })
        }
      })

  },
  deleteGenre: (req, res) => {
    const id = req.params.id
    modelBooks.genreCheckById(id)
      .then(result => {
        if (result.length !== 0) {
          return modelBooks.deleteGenre(id)
            .then(result => res.json({
              status: 200,
              message: 'Genre has been deleted',
              result
            }))
            .catch(err => console.log(err))
        } else {
          return res.status(400).send({
            status: 400,
            message: 'Genre does not exist'
          })
        }
      })
  }
}