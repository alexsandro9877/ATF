// routes.ts
import { FastifyInstance } from 'fastify';
import ImageController from '../controllers/ImageController'; // Verifique o caminho correto

const imageController = new ImageController();

export async function routes(app: FastifyInstance) {
  // Outras rotas...

  // Rota para upload de imagem
  app.post('/upload', { preHandler: upload.single('file') }, imageController.uploadImage);

  // Rota para obter dados da imagem
  app.get('/images/:id', imageController.getImageData);

  // Outras rotas...
}
