import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient, UploadImagem } from '@prisma/client';
import ImageService, { DeleteImagemProps, UploadImageData } from '../services/ImageService';

const prisma = new PrismaClient();

 class ImageController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const upload = new ImageService();

    try {
      // Verifica se a requisição é multipart/form-data
      if (!request.isMultipart()) {
        throw new Error('Requisição não é multipart/form-data.');
      }

      // Obtém os dados do arquivo
      const data = await request.file();
      if (!data || !data.file) {
        throw new Error('Arquivo não encontrado na requisição.');
      }

      // Obtém o accountId da query string
      const { accountId } = request.query as { accountId: string };

      // Salvar a imagem como dados de bytes no banco de dados
      const imageData: Buffer = await new Promise((resolve, reject) => {
        const chunks: any[] = [];
        data.file.on('data', (chunk) => chunks.push(chunk));
        data.file.on('end', () => resolve(Buffer.concat(chunks)));
        data.file.on('error', (err) => reject(err));
      });

      const savedImage = {
        accountId,
        imageData,
      } as UploadImageData;

      const envio = await upload.uploadImg(savedImage);

      reply.send({id: envio.id, mensage: 'Imagem salva com sucesso!'});
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao salvar a imagem no banco de dados.', message: error });
    }
  }
}
class GetImageByIdController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const imageService = new ImageService();

    try {
      const image = await imageService.getImageById(id);
      if (!image) {
        reply.status(404).send({ message: 'Imagem não encontrada.' });
        return;
      }

      const formattedImageData:UploadImagem  = imageService.formatImageData(image);
      reply.send({id: formattedImageData.id, accountId: formattedImageData.accountId });
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar imagem.', message: error });
    }
  }
}
class DeleteImageByIdController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }
    const imageService = new ImageService();

    try {
        const result = await imageService.deleteImageById({ id });
        reply.send(result);
    } catch (error) {
        //@ts-ignore
        reply.status(400).send({ message: error.message });
    }
}
}
class DownloadImageController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const imageService = new ImageService();

    try {
      const image = await imageService.getImageById(id);
      if (!image) {
        reply.status(404).send({ message: 'Imagem não encontrada.' });
        return;
      }

      // Configura a resposta para download
      reply.header('Content-Disposition', `attachment; filename=${image.id}.jpg`);
      reply.header('Content-Type', 'image/jpeg');
      reply.send(image.imageData);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar imagem.', message: error });
    }
  }
}

class ListImageController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
      const listImagesService = new ImageService();

      try {
          const image = await listImagesService.getImageAll();
          reply.send(image);
      } catch (error) {
          //@ts-ignore
          reply.status(500).send({ message: error.message });
      }
  }
}

class GetImageByImageIdController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
      const { accountId } = request.query as { accountId: string };
      const getImagemstByIdService = new ImageService();

      try {
          const imagem = await getImagemstByIdService.getImageAllbyid(accountId);
          reply.send(imagem);
      } catch (error) {
          //@ts-ignore
          reply.status(400).send({ message: error.message });
      }
  }
}

export { ImageController,GetImageByIdController,DownloadImageController,DeleteImageByIdController,GetImageByImageIdController,ListImageController }