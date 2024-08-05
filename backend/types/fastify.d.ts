// types/fastify.d.ts
import 'fastify';
import '@fastify/oauth2';

declare module 'fastify' {
    interface FastifyRequest {
        user?: {
            username: string;
        }
    }
    interface FastifyInstance {
        googleOAuth2: any; // Ajuste o tipo conforme necessário
      }
}
