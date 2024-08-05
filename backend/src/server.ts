import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import dotenv from 'dotenv';
import { routes } from './routes/routes';
import fastifyMultipart from '@fastify/multipart';

import fastifyJwt from '@fastify/jwt';

dotenv.config();

const app = fastify({ logger: true });

const start = async () => {
    await app.register(cors);
    await app.register(fastifyCookie);
    
    app.register(fastifyMultipart);
    app.register(fastifyJwt, {
        secret: process.env.JWT_SECRET!,
    });

    app.register(routes);

    // Middleware de autenticação para proteger rotas
    // app.addHook('onRequest', async (request, reply) => {
    //     if (request.routerPath !== '/login' && request.routerPath !== '/refresh') {
    //         try {
    //             await request.jwtVerify();
    //         } catch (err) {
    //             reply.send(err);
    //         }
    //     }
    // });
    // Registra o plugin de impressão de rotas
 
    try {
        await app.listen({ port: 3333 });
        console.log('Server is running on http://localhost:3333');
       // console.log(app.printRoutes());
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

start();
