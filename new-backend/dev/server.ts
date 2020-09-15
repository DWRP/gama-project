import express from 'express'
import cors from 'cors'
import path from 'path'

require('dotenv').config()

import routes from './routes'

const app = express()

app.use(cors())

app.use(express.json())
app.use(routes)

app.use(express.static(path.resolve(__dirname,'public')))

app.listen(process.env.PORT || 8080)