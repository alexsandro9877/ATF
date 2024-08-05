import { FastifyRequest, FastifyReply } from 'fastify';
import { MercadoLivreService } from '../services/mercadoLivreService';

const mercadoLivreService = new MercadoLivreService();

export const getApplicationInfo = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const applicationInfo = await mercadoLivreService.fetchApplicationInfo();
        reply.send(applicationInfo);
    } catch (error) {
        reply.status(500).send({ message: 'Failed to fetch application info' });
    }
};
