import { FastifyRequest, FastifyReply } from 'fastify';
import { SendMessageService } from '../services/sendMessageService';

class SendMessageController {
  private sendMessageService: SendMessageService;

  constructor() {
    this.sendMessageService = new SendMessageService();
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { to, message } = request.body as { to: string; message: string };

    try {
      const info = await this.sendMessageService.execute(to, message);
      reply.send(`Message sent to ${info.to}`);
    } catch (error) {
      //@ts-ignore
      reply.status(500).send({ message: error.message });
    }
  }
}

export { SendMessageController };
