const conn = require('../configs/db')

module.exports = {
  getGenres: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM genre', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  insertGenre: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT genre SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  updateGenre: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE genre SET ? WHERE genre_id=?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteGenre: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM genre WHERE genre_id=?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}