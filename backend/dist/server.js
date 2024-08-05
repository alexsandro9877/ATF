"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes/routes");
const multipart_1 = __importDefault(require("@fastify/multipart"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
dotenv_1.default.config();
const app = (0, fastify_1.default)({ logger: true });
const start = async () => {
    await app.register(cors_1.default);
    await app.register(cookie_1.default);
    app.register(multipart_1.default);
    app.register(jwt_1.default, {
        secret: process.env.JWT_SECRET,
    });
    app.register(routes_1.routes);
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
    }
    catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};
start();
