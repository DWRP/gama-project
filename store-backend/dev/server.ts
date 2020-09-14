import express from 'express'
import cors,{ CorsOptions } from 'cors'
import path from 'path'

import routes from './routes'

const app = express()

const whitelist = process.env.WORKSPACES?.split(',').map(item=>`${item}--${process.env.SHOP_URL}`)

const corsOptions:CorsOptions = {
    origin: whitelist
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(routes)

app.use(express.static(path.resolve(__dirname,'public')))

app.listen(8080)