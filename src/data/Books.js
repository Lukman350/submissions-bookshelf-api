import Log from "../utils/log"

class Books {
  #books

  constructor() {
    this.#books = []
  }

  save = (book) => {
    this.#books.push(book)
    Log.info(`New book has been added with ID: ${book.id}`)
  }

  delete = (index) => {
    if (index !== -1) {
      Log.info(`Book Index: ${index} has been deleted`)
      this.#books.splice(index, 1)
    }
  }

  update = (bookId, book) => {
    const bookIndex = this.#books.findIndex((book) => book.id === bookId)

    if (bookIndex !== -1) {
      this.#books[bookIndex] = {
        ...this.#books[bookIndex],
        ...book
      }

      Log.info(`Book ID: ${bookId} has been updated`)
    }
  }

  read = () => this.#books
}

export default Books
