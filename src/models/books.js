const conn = require('../configs/db')
const joinTable = 'SELECT book.title, book.desc, book.image_url, book.released_at, genre.genre, status.status FROM book, genre, status WHERE book.genre=genre.genre_id AND book.available=status.status_id'

module.exports = {
  getBooks: (beginData, numPerPage, sort, order, querySearch) => {
    return new Promise((resolve, reject) => {
      conn.query(`${joinTable} ${querySearch} ORDER BY book.${sort} ${order} LIMIT ?, ?`, [beginData, numPerPage], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getABook: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(`${joinTable} AND book.book_id=?`, id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(result)
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
  getAvailableBooks: (beginData, numPerPage, sort, order, querySearch) => {
    return new Promise((resolve, reject) => {
      conn.query(`${joinTable} AND status.status_id=1 ${querySearch} ORDER BY book.${sort} ${order} LIMIT ?, ?`, [beginData, numPerPage], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  rentBook: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE book SET ? WHERE book_id=?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getAllRentedBook: () => {
    return new Promise((resolve, reject) => {
      conn.query(`${joinTable} AND status.status_id=0`, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  returnBook: (data, id) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE book SET ? WHERE book_id=?', [data, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
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