const conn = require('../configs/db')
const joinTable = 'SELECT book.title, book.desc, book.image_url, book.released_at, genre.genre, status.status FROM book, genre, status WHERE book.genre=genre.genre_id AND book.available=status.status_id'

module.exports = {
  getBooks: () => {
    return new Promise((resolve, reject) => {
      conn.query(joinTable, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  insertBook: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT book SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  updateBook: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE book SET ? WHERE book_id=?', [
        data,
        id
      ], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  deleteBook: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM book WHERE book_id=?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  sortByTitle: () => {
    return new Promise((resolve, reject) => {
      conn.query(`${joinTable} ORDER BY book.title ASC`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  sortByDate: () => {
    return new Promise((resolve, reject) => {
      conn.query(`${joinTable} ORDER BY book.released_at DESC`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  sortByGenre: () => {
    return new Promise((resolve, reject) => {
      conn.query(`${joinTable} ORDER BY genre.genre ASC`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  searchBook: (q) => {
    return new Promise((resolve, reject) => {
      conn.query(`${joinTable} AND book.title LIKE '%${q}%'`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}