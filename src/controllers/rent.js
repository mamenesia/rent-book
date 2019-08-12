const modelRent = require('../models/rent')

module.exports = {
  getAvailableBooks: (req, res) => {
    modelRent.getAvailableBooks()
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  rentBook: (req, res) => {
    const data = {
      available: 0
    }
    let id = req.params.id
    modelRent.rentBook(data, id)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  }
}