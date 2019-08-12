const modelGenres = require('../models/genres')

module.exports = {
  getGenres: (req, res) => {
    modelGenres.getGenres()
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  insertGenre: (req, res) => {
    const data = {
      genre: req.body.genre
    }

    modelGenres.insertGenre(data)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  updateGenre: (req, res) => {
    const data = {
      genre: req.body.genre
    }

    let id = req.params.id
    modelGenres.updateGenre(data, id)
      .then(result => res.json(result))
      .catch(err => console.log(err))
  },
  deleteGenre: (req, res) => {
    let id = req.params.id
    modelGenres.deleteGenre(id)
      .then(result => console.log('Genre has been deleted', result))
      .catch(err => console.log(err))
  }
}