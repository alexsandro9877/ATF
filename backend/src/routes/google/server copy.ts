// server.ts
import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyOauth2 from '@fastify/oauth2';
import fastifyCookie from '@fastify/cookie';
import dotenv from 'dotenv';
import { googleRoutes } from './routes/googleRoutes';
import { authMiddleware } from './middlewares/authMiddleware';
import { routes } from './routes/routes';
import fastifyPrintRoutes from 'fastify-print-routes';
import fastifyMultipart from '@fastify/multipart';
// import fastifyMulter from 'fastify-multer';


dotenv.config();

const app = fastify({ logger: true });

const start = async () => {
    await app.register(cors);
    await app.register(fastifyCookie);
    app.register(fastifyMultipart);
    // await app.register(fastifyMulter.contentParser); // Registro do plugin fastify-multer para parsear uploads de arquivos
   // await app.register(fastifyPrintRoutes); // Para imprimir as rotas

    // Configuração do Fastify OAuth2 para login com Google
    app.register(fastifyOauth2, {
        name: 'googleOAuth2',
         scope: ['https://www.googleapis.com/auth/userinfo.profile'],
        credentials: {
            client: {
                id: process.env.GOOGLE_CLIENT_ID!,
                secret: process.env.GOOGLE_CLIENT_SECRET!,
            },
            auth: fastifyOauth2.GOOGLE_CONFIGURATION,
        },
       // scope: ['email', 'profile'],
        startRedirectPath: '/login/google', // Rota de início do processo de login
        callbackUri: 'http://localhost:3333/login/google/callback', // URI de callback para autenticação quem faz a chamada
        // preHandler: authMiddleware, // Middleware para autenticação
       
    });

    // Registro das rotas
    app.register(googleRoutes);
    app.register(routes);

    try {
        await app.listen({ port: 3333 });
        console.log('Server is running on http://localhost:3333');
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

start();
