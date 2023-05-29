import { CLOSING } from "ws";
import IMessage from "../interfaces/message";
import Messages from "../model/messageModel";

class Message {
  public async sendMessage(message: Omit<IMessage, "id">) {
    try {
      const data = await Messages.create({
        message: { text: message.message },
        from: message.from,
        to: message.to,
      });

      console.log(data);

      return data ? data : false;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  public async getMessage(data: { from: number; to: number }) {
    const messages = await Messages.find({
      from: data.from,
      to: data.to,
    }).sort({ updatedAt: 1 });

    return messages ? messages : false;
  }
}

export default new Message();
