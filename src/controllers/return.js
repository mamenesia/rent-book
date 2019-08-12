const modelReturn = require('../models/return')

module.exports = {
  getAllRentedBook: (req, res) => {
    modelReturn.getAllRentedBook()
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  returnBook: (req, res) => {
    const data = {
      available: 1
    }
    let id = req.params.id
    modelReturn.returnBook(data, id)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  }
}