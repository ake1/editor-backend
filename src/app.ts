import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { notFound, wrapError } from './mw/error-handling'
import root from './routes/root'
import editor from './routes/editor'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
if (process.env.NODE_ENV !== 'test') app.use(morgan('combined'))

app.use(root)
app.use('/editor', editor)

app.use(notFound)
app.use(wrapError)

export default app
