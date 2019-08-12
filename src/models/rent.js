const conn = require('../configs/db')

module.exports = {
  getAvailableBooks: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT book.title, book.desc, book.image_url, book.released_at, genre.genre, status.status FROM book, genre, status WHERE book.genre=genre.genre_id AND book.available=status.status_id AND status.status_id=1', (err, result) => {
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
  }
}