import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import router from './app/routes/index.js'
import { dbConnectSQL } from './app/config/mysql.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT
const PLATFORM = process.platform

app.use(cors())
app.use(express.json())

app.use(router)

app.listen(PORT, () => {
    console.log('API lista')
    console.log('Puerto:', PORT)
    console.log('Plataforma:', PLATFORM)
})

dbConnectSQL()