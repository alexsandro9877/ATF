"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageService = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
class SendMessageService {
    constructor() {
        this.client = new whatsapp_web_js_1.Client({
            authStrategy: new whatsapp_web_js_1.LocalAuth(),
        });
        // Cria uma promessa para garantir que o cliente esteja pronto antes de enviar mensagens
        this.clientReady = new Promise((resolve, reject) => {
            // Evento para gerar o QR Code quando necessário
            this.client.on('qr', (qr) => {
                console.log('QR Code recebido, escaneie com seu telefone:');
                qrcode_terminal_1.default.generate(qr, { small: true });
            });
            // Evento acionado quando o cliente está pronto para uso
            this.client.on('ready', () => {
                console.log('Cliente do WhatsApp está pronto!');
                resolve();
            });
            // Evento acionado quando ocorre uma falha na autenticação
            this.client.on('auth_failure', (msg) => {
                console.error('Falha na autenticação:', msg);
                reject(new Error('Falha na autenticação'));
            });
            // Evento acionado quando o cliente é desconectado
            this.client.on('disconnected', (reason) => {
                console.log('Cliente foi desconectado:', reason);
                reject(new Error('Cliente foi desconectado'));
            });
            // Inicializa o cliente
            this.client.initialize();
        });
    }
    // Método para enviar uma mensagem
    async execute(to, message) {
        try {
            // Aguarda até que o cliente esteja pronto
            await this.clientReady;
            console.log(`Enviando mensagem para ${to}`);
            // Envia a mensagem
            const result = await this.client.sendMessage(to, message);
            console.log('Mensagem enviada:', result);
            return result;
        }
        catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            throw new Error('Falha ao enviar mensagem');
        }
    }
}
exports.SendMessageService = SendMessageService;
