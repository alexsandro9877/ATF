import { FastifyOAuth2 } from '@fastify/oauth2';

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: FastifyOAuth2;
  }
}
