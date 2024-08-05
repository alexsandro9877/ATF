// src/routes/routes.ts

import { FastifyInstance } from 'fastify';
import { authRoutes } from '../routes/auth';
import { protectedRoutes } from '../routes/protected';

export async function routes(app: FastifyInstance) {

  // Rota de proteção para gerar token
  app.register(authRoutes);

  // Rotas protegidas
  app.register(protectedRoutes);
}
