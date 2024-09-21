import chalk from "chalk"
import { APP_NAME } from "./constants.js"

class Log {
  static log = console.log

  static info = (message) => {
    this.log(
      chalk.magenta(`[${APP_NAME}] INFO: `) + chalk.whiteBright(`${message}`)
    )
  }

  static error = (message) => {
    this.log(chalk.red(`[${APP_NAME}] ERROR: `) + chalk.redBright(`${message}`))
  }

  static success = (message) => {
    this.log(
      chalk.green(`[${APP_NAME}] SUCCESS: `) + chalk.greenBright(`${message}`)
    )
  }
}

export default Log
