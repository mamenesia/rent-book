const modelBooks = require('../models/books')

module.exports = {
  getBooks: (req, res) => {
    const numPerPage = 3
    // let dataLength = Object.keys(req.query).length
    // // const numPages = Math.ceil(dataLength / numPerPage)
    let activePage = req.query.page || 1
    let beginData = (numPerPage * activePage) - numPerPage
    modelBooks.getBooks(beginData, numPerPage)
      .then(result => res.json(result))
      .catch(err => console.log(err))
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
  sortByTitle: (req, res) => {
    modelBooks.sortByTitle()
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  sortByDate: (req, res) => {
    modelBooks.sortByDate()
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  sortByGenre: (req, res) => {
    modelBooks.sortByGenre()
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  searchBook: (req, res) => {
    let q = req.params.q
    modelBooks.searchBook(q)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  }
}