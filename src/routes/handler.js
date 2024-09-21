import { nanoid } from "nanoid"
import Books from "../data/Books"
import Log from "../utils/log"

class RouteHandler {
  #books

  constructor() {
    this.#books = new Books()
  }

  onAddBook = (request, h) => {
    const { name, pageCount, readPage } = request.payload

    if (!name) {
      Log.error(
        "RouteHandler.OnAddBook(): Gagal menambahkan buku. Mohon isi nama buku"
      )

      return h
        .response({
          status: "fail",
          message: "Gagal menambahkan buku. Mohon isi nama buku"
        })
        .code(400)
    }

    if (readPage > pageCount) {
      Log.error(
        "RouteHandler.OnAddBook(): Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
      )

      return h
        .response({
          status: "fail",
          message:
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })
        .code(400)
    }

    const insertedAt = new Date().toISOString()
    const bookId = nanoid(20)

    const book = {
      id: bookId,
      finished: pageCount === readPage,
      insertedAt,
      updatedAt: insertedAt,
      ...request.payload
    }

    this.#books.save(book)

    return h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId
        }
      })
      .code(201)
  }

  onGetAllBooks = (request, h) => {
    const { name, reading, finished } = request.query

    const books = this.#books.read()

    let data = []
    let filteredBooks = books

    if (name !== undefined) {
      filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(name.toLowerCase())
      )
    }

    if (reading !== undefined) {
      filteredBooks = books.filter((book) => book.reading === reading)
    }

    if (finished !== undefined) {
      filteredBooks = books.filter((book) => book.finished === finished)
    }

    data = filteredBooks.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher
    }))

    return h
      .response({
        status: "success",
        data: {
          books: data
        }
      })
      .code(200)
  }

  onShowBook = (request, h) => {
    const { bookId } = request.params

    const books = this.#books.read()
    const book = books.filter((book) => book.id === bookId)[0]

    if (!book) {
      Log.error(`RouteHandler.onShowBook(): Buku ID ${bookId} tidak ditemukan`)

      return h
        .response({
          status: "fail",
          message: "Buku tidak ditemukan"
        })
        .code(404)
    }

    return h
      .response({
        status: "success",
        data: {
          book
        }
      })
      .code(200)
  }

  onUpdateBook = (request, h) => {
    const { bookId } = request.params
    const { name, readPage, pageCount } = request.payload

    if (!name) {
      Log.error(
        "RouteHandler.onUpdateBook(): Gagal memperbarui buku. Mohon isi nama buku"
      )

      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku"
        })
        .code(400)
    }

    if (readPage > pageCount) {
      Log.error(
        "RouteHandler.onUpdateBook(): Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
      )

      return h
        .response({
          status: "fail",
          message:
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        })
        .code(400)
    }

    const books = this.#books.read()
    const book = books.filter((book) => book.id === bookId)[0]

    if (!book) {
      Log.error(
        `RouteHandler.onUpdateBook(): Gagal memperbarui buku. Buku Id ${bookId} tidak ditemukan`
      )

      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Id tidak ditemukan"
        })
        .code(404)
    }

    const updatedAt = new Date().toISOString()
    const updatedBook = { ...request.payload, updatedAt }

    this.#books.update(bookId, updatedBook)

    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui"
      })
      .code(200)
  }

  onDeleteBook = (request, h) => {
    const { bookId } = request.params

    const books = this.#books.read()
    const book = books.findIndex((book) => book.id === bookId)

    if (book === -1) {
      Log.error(
        `RouteHandler.onDeleteBook(): Buku gagal dihapus. Buku Id ${bookId} tidak ditemukan`
      )

      return h
        .response({
          status: "fail",
          message: "Buku gagal dihapus. Id tidak ditemukan"
        })
        .code(404)
    }

    this.#books.delete(book)

    return h
      .response({
        status: "success",
        message: "Buku berhasil dihapus"
      })
      .code(200)
  }
}

export default RouteHandler
