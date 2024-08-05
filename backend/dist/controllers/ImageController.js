"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListImageController = exports.GetImageByImageIdController = exports.DeleteImageByIdController = exports.DownloadImageController = exports.GetImageByIdController = exports.ImageController = void 0;
const client_1 = require("@prisma/client");
const ImageService_1 = __importDefault(require("../services/ImageService"));
const prisma = new client_1.PrismaClient();
class ImageController {
    async handle(request, reply) {
        const upload = new ImageService_1.default();
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
            const { accountId } = request.query;
            // Salvar a imagem como dados de bytes no banco de dados
            const imageData = await new Promise((resolve, reject) => {
                const chunks = [];
                data.file.on('data', (chunk) => chunks.push(chunk));
                data.file.on('end', () => resolve(Buffer.concat(chunks)));
                data.file.on('error', (err) => reject(err));
            });
            const savedImage = {
                accountId,
                imageData,
            };
            const envio = await upload.uploadImg(savedImage);
            reply.send({ id: envio.id, mensage: 'Imagem salva com sucesso!' });
        }
        catch (error) {
            reply.status(500).send({ error: 'Erro ao salvar a imagem no banco de dados.', message: error });
        }
    }
}
exports.ImageController = ImageController;
class GetImageByIdController {
    async handle(request, reply) {
        const { id } = request.params;
        const imageService = new ImageService_1.default();
        try {
            const image = await imageService.getImageById(id);
            if (!image) {
                reply.status(404).send({ message: 'Imagem não encontrada.' });
                return;
            }
            const formattedImageData = imageService.formatImageData(image);
            reply.send({ id: formattedImageData.id, accountId: formattedImageData.accountId });
        }
        catch (error) {
            reply.status(500).send({ error: 'Erro ao buscar imagem.', message: error });
        }
    }
}
exports.GetImageByIdController = GetImageByIdController;
class DeleteImageByIdController {
    async handle(request, reply) {
        const { id } = request.query;
        const imageService = new ImageService_1.default();
        try {
            const result = await imageService.deleteImageById({ id });
            reply.send(result);
        }
        catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}
exports.DeleteImageByIdController = DeleteImageByIdController;
class DownloadImageController {
    async handle(request, reply) {
        const { id } = request.params;
        const imageService = new ImageService_1.default();
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
        }
        catch (error) {
            reply.status(500).send({ error: 'Erro ao buscar imagem.', message: error });
        }
    }
}
exports.DownloadImageController = DownloadImageController;
class ListImageController {
    async handle(request, reply) {
        const listImagesService = new ImageService_1.default();
        try {
            const image = await listImagesService.getImageAll();
            reply.send(image);
        }
        catch (error) {
            //@ts-ignore
            reply.status(500).send({ message: error.message });
        }
    }
}
exports.ListImageController = ListImageController;
class GetImageByImageIdController {
    async handle(request, reply) {
        const { accountId } = request.query;
        const getImagemstByIdService = new ImageService_1.default();
        try {
            const imagem = await getImagemstByIdService.getImageAllbyid(accountId);
            reply.send(imagem);
        }
        catch (error) {
            //@ts-ignore
            reply.status(400).send({ message: error.message });
        }
    }
}
exports.GetImageByImageIdController = GetImageByImageIdController;
