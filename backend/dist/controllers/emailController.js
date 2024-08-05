"use strict";
// src/controllers/sendEmailController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailController = void 0;
const emailService_1 = require("../services/emailService");
class SendEmailController {
    async handle(request, reply) {
        const sendEmailService = new emailService_1.SendEmailService();
        const { name, email, message } = request.body;
        try {
            const info = await sendEmailService.execute(name, email, message);
            reply.send(`Email sent: ${info.response}`);
        }
        catch (error) {
            //@ts-ignore
            reply.status(500).send({ message: error.message });
        }
    }
}
exports.SendEmailController = SendEmailController;
