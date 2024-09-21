import Hapi from "@hapi/hapi"
import Routes from "./src/routes/routes.js"
import Log from "./src/utils/log.js"

class Server {
  #server

  constructor(host, port, options = {}) {
    this.host = host
    this.port = port

    this.#server = Hapi.server({
      host: this.host,
      port: this.port,
      ...options
    })

    const routes = new Routes()

    this.#server.route(routes.getRoutes())
  }

  init = async () => {
    try {
      await this.#server.start()

      Log.info(
        `
### ##    ## ##    ## ##   ##  ###   ## ##   ###  ##  ### ###  ####     ### ###  
 ##  ##  ##   ##  ##   ##  ##  ##   ##   ##   ##  ##   ##  ##   ##       ##  ##  
 ##  ##  ##   ##  ##   ##  ## ##    ####      ##  ##   ##       ##       ##      
 ## ##   ##   ##  ##   ##  ## ##     #####    ## ###   ## ##    ##       ## ##   
 ##  ##  ##   ##  ##   ##  ## ###       ###   ##  ##   ##       ##       ##      
 ##  ##  ##   ##  ##   ##  ##  ##   ##   ##   ##  ##   ##  ##   ##  ##   ##      
### ##    ## ##    ## ##   ##  ###   ## ##   ###  ##  ### ###  ### ###  ####     
                                                                                 
                             ##     ### ##     ####   
                              ##     ##  ##     ##    
                            ## ##    ##  ##     ##    
                            ##  ##   ##  ##     ##    
                            ## ###   ## ##      ##    
                            ##  ##   ##         ##    
                           ###  ##  ####       #### 
`
      )

      Log.info("IDCamp 2024 - Backend Developer")
      Log.info("Submission: Belajar Membuat Aplikasi Back-End untuk Pemula\n")

      Log.success(`Server has been started on ${this.#server.info.uri}`)
    } catch (error) {
      Log.error(error)
    }
  }
}

const server = new Server("localhost", 9000)

process.on("unhandledRejection", (err) => {
  Log.error(err)
  process.exit(1)
})

server.init()
