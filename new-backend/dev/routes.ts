import express from 'express'
import OrderController from './src/controllers/OrderController'
import ServerController from './src/controllers/ServerController'

const routes = express.Router()

routes.get('/', ServerController.index)
routes.get('/status', ServerController.status)

routes.get("/:shop/orders/:id", OrderController.show)
routes.get("/orders/:id", OrderController.show)

export default routes