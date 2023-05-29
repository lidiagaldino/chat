import { Router } from 'express'
import MessageController from '../controller/MessageController'

const routes = Router()

routes.get('/', MessageController.getMessage)
routes.post('/', MessageController.storeMessage)

export default routes