import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

class SendMessageService {
  private client: Client;
  private clientReady: Promise<void>;

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
    });
// Cria uma promessa para garantir que o cliente esteja pronto antes de enviar mensagens
this.clientReady = new Promise((resolve, reject) => {
  // Evento para gerar o QR Code quando necessário
  this.client.on('qr', (qr) => {
    console.log('QR Code recebido, escaneie com seu telefone:');
    qrcode.generate(qr, { small: true });
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
async execute(to: string, message: string) {
try {
  // Aguarda até que o cliente esteja pronto
  await this.clientReady;
  console.log(`Enviando mensagem para ${to}`);
  // Envia a mensagem
  const result = await this.client.sendMessage(to, message);
  console.log('Mensagem enviada:', result);
  return result;
} catch (error) {
  console.error('Erro ao enviar mensagem:', error);
  throw new Error('Falha ao enviar mensagem');
}
}
}
export { SendMessageService };