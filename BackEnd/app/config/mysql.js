import * as dotenv from "dotenv"
import { Sequelize } from "sequelize"
import mysql2 from "mysql2"

dotenv.config()
// Las siguientes datos los extrae de leer el archivo .env
const hostname = process.env.DB_HOST
const database = process.env.DB_NAME
const username = process.env.DB_USER
const password = process.env.DB_PASS
//for deploy
const dbport = process.env.DB_PORT

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host: hostname,
        port: dbport, //for deploy
        dialect: "mysql",
        dialectModule: mysql2,
    }
)

const dbConnectSQL = async() => {
    try {
        await sequelize.authenticate()
        console.log("MySQL connection success")
    } catch (error) {
        console.log(error)
        console.log("MySQL connection error")
    }
}

export { sequelize, dbConnectSQL }
