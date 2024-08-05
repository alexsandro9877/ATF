"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoLivreService = void 0;
const mercadoLivreApi_1 = require("../integrations/mercadoLivreApi");
class MercadoLivreService {
    async fetchApplicationInfo() {
        try {
            const applicationInfo = await mercadoLivreApi_1.mercadoLivreApi.getApplicationInfo();
            // Faça algo com a resposta aqui, como processar ou armazenar os dados.
            return applicationInfo;
        }
        catch (error) {
            throw new Error(`Failed to fetch application info: ${error}`);
        }
    }
}
exports.MercadoLivreService = MercadoLivreService;
