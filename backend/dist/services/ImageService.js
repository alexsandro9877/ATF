"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Serviço para lidar com operações relacionadas a imagens
class ImageService {
    // Método para salvar uma nova imagem
    async uploadImg(data) {
        try {
            const { accountId, imageData } = data;
            // Salvar imagem no banco de dados usando Prisma
            const image = await prisma.uploadImagem.create({
                data: {
                    accountId,
                    imageData,
                },
            });
            return image;
        }
        catch (error) {
            throw new Error(`Erro ao fazer upload da imagem: ${error}`);
        }
    }
    // Método para buscar uma imagem pelo ID
    async getImageById(id) {
        try {
            const image = await prisma.uploadImagem.findUnique({
                where: { id },
            });
            return image;
        }
        catch (error) {
            throw new Error(`Erro ao buscar imagem: ${error}`);
        }
    }
    // Método para deletar uma imagem pelo ID
    async deleteImageById({ id }) {
        if (!id) {
            throw new Error("ID não fornecido.");
        }
        try {
            const imagem = await prisma.uploadImagem.findUnique({
                where: {
                    id: id
                }
            });
            if (!imagem) {
                throw new Error(`imagem com ID ${id} não encontrada.`);
            }
            await prisma.uploadImagem.delete({
                where: {
                    id: id
                }
            });
            return { message: `imagem ${id} deletado com sucesso!` };
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    // Método para formatar os dados da imagem para resposta JSON
    formatImageData(image) {
        return {
            id: image.id,
            accountId: image.accountId,
            imageData: {
                type: 'Buffer',
                data: Array.from(image.imageData), // Converte o Buffer em um array de números
            },
            createdAt: image.createdAt.toISOString(),
            updatedAt: image.updatedAt.toISOString(),
        };
    }
    // Método para mostar todas as imagens
    async getImageAll() {
        try {
            const image = await prisma.uploadImagem.findMany();
            if (image.length === 0) {
                return ({ message: "Sem imagens cadastradas" });
            }
            const resposta = image.map((e) => ({ accountId: e.accountId, id: e.id, createdAt: e.createdAt }));
            return resposta;
        }
        catch (error) {
            throw new Error("Erro ao listar as imagens: " + error);
        }
    }
    async getImageAllbyid(accountId) {
        if (!accountId) {
            throw new Error("ID não fornecido.");
        }
        try {
            const image = await prisma.uploadImagem.findMany({
                where: {
                    accountId: accountId
                }
            });
            if (!image) {
                throw new Error("Conta não encontrada para o ID fornecido.");
            }
            const resposta = image.map((e) => ({ accountId: e.accountId, id: e.id, createdAt: e.createdAt }));
            return resposta;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
}
exports.ImageService = ImageService;
exports.default = ImageService;
