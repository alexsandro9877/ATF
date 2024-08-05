"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationInfo = void 0;
const mercadoLivreService_1 = require("../services/mercadoLivreService");
const mercadoLivreService = new mercadoLivreService_1.MercadoLivreService();
const getApplicationInfo = async (req, reply) => {
    try {
        const applicationInfo = await mercadoLivreService.fetchApplicationInfo();
        reply.send(applicationInfo);
    }
    catch (error) {
        reply.status(500).send({ message: 'Failed to fetch application info' });
    }
};
exports.getApplicationInfo = getApplicationInfo;
