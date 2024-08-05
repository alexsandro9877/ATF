"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mercadoLivreController_1 = require("../controllers/mercadoLivreController");
//rota teste
async function mercadoLivreRoutes(fastify) {
    fastify.get('/api/mercadoLivre/applicationInfo', mercadoLivreController_1.getApplicationInfo);
}
exports.default = mercadoLivreRoutes;
