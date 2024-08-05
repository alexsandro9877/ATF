// src/controllers/sendEmailController.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import { SendEmailService } from '../services/emailService';

class SendEmailController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const sendEmailService = new SendEmailService();
    const { name, email, message } = request.body as {
      name: string;
      email: string;
      message: string;
    };

    try {
      const info = await sendEmailService.execute(name, email, message);
      reply.send(`Email sent: ${info.response}`);
    } catch (error) {
      //@ts-ignore
      reply.status(500).send({ message: error.message });
    }
  }
}

export { SendEmailController };
