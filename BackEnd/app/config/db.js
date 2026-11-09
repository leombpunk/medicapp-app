import * as dotenv from "dotenv"
import { Sequelize } from "sequelize"
import mysql2 from "mysql2"
import postgresModule from 'pg-hstore'

dotenv.config()
// Las siguientes datos los extrae de leer el archivo .env
const hostname = process.env.DB_HOST
const database = process.env.DB_NAME
const username = process.env.DB_USER
const password = process.env.DB_PASS
const dialect = process.env.DB_DIALECT
//for deploy
const dbport = process.env.DB_PORT

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host: hostname,
        port: dbport, //for deploy
        dialect: dialect, 
        // dialectModule: postgresModule,
    }
)

const dbConnectSQL = async() => {
    try {
        await sequelize.authenticate()
        console.log("DB connection success")
    } catch (error) {
        console.log(error)
        console.log("DB connection error")
    }
}

export { sequelize, dbConnectSQL }
