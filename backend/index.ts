import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import routes from './routes/routes'

require('dotenv').config()

const { PORT, HOST } = process.env

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.listen(parseInt(PORT as string), HOST as string, () => {
  console.log(`Server running on port ${PORT} and host ${HOST}`)
})

app.use(routes)
