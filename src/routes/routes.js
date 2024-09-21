import RouteHandler from "./handler.js"

class Routes {
  routes

  constructor() {
    this.handler = new RouteHandler()

    this.routes = [
      {
        method: "POST",
        path: "/books",
        handler: this.handler.onAddBook
      },
      {
        method: "GET",
        path: "/books",
        handler: this.handler.onGetAllBooks
      },
      {
        method: "GET",
        path: "/books/{bookId}",
        handler: this.handler.onShowBook
      },
      {
        method: "PUT",
        path: "/books/{bookId}",
        handler: this.handler.onUpdateBook
      },
      {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: this.handler.onDeleteBook
      }
    ]
  }

  getRoutes = () => this.routes
}

export default Routes
