import { Request, Response } from 'express'
import IMessage from '../interfaces/message'
import Message from '../services/Message'

class MessageController {
    public async getMessage(req: Request, res: Response) {
        const data = {
            from: Number(req.params.id_from),
            to: Number(req.params.id_to)
        }

        const get = await Message.getMessage(data)

        return get ? res.status(200).json(get) : res.status(404).json({})
    }

    public async storeMessage(req: Request<{}, {}, Omit<IMessage, 'id'>>, res: Response) {
        const data = req.body

        const message = await Message.sendMessage(data)

        return message ? res.status(201).json(message) : res.status(500).json({})
    }
}

export default new MessageController()