import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'

const app = express()
dotenv.config()

app.use(json())
app.use(cors())

app.use(authRoutes)

app.listen(process.env.PORT)
