"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageController = void 0;
const sendMessageService_1 = require("../services/sendMessageService");
class SendMessageController {
    constructor() {
        this.sendMessageService = new sendMessageService_1.SendMessageService();
    }
    async handle(request, reply) {
        const { to, message } = request.body;
        try {
            const info = await this.sendMessageService.execute(to, message);
            reply.send(`Message sent to ${info.to}`);
        }
        catch (error) {
            //@ts-ignore
            reply.status(500).send({ message: error.message });
        }
    }
}
exports.SendMessageController = SendMessageController;
