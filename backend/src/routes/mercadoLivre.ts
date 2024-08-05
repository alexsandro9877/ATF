import { FastifyInstance } from 'fastify';
import { getApplicationInfo } from '../controllers/mercadoLivreController';

//rota teste
async function mercadoLivreRoutes(fastify: FastifyInstance) {
    fastify.get('/api/mercadoLivre/applicationInfo', getApplicationInfo);
}

export default mercadoLivreRoutes;
