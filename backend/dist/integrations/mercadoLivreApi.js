"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mercadoLivreApi = exports.MercadoLivreApi = void 0;
const axios_1 = __importDefault(require("axios"));
class MercadoLivreApi {
    constructor(baseUrl, clientId, clientSecret, refreshToken) {
        this.accessToken = null;
        this.baseUrl = baseUrl;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.refreshToken = refreshToken;
    }
    async authenticate() {
        try {
            const response = await axios_1.default.post('https://api.mercadolibre.com/oauth/token', `grant_type=refresh_token&client_id=${this.clientId}&client_secret=${this.clientSecret}&refresh_token=${this.refreshToken}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            });
            if (response.status === 200) {
                this.accessToken = response.data.access_token;
            }
            else {
                throw new Error('Failed to authenticate');
            }
        }
        catch (error) {
            throw new Error(`Error authenticating with Mercado Livre API: ${error}`);
        }
    }
    async getApplicationInfo() {
        if (!this.accessToken) {
            await this.authenticate();
        }
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/applications/2668378137203164`, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to fetch application info: ${error}`);
        }
    }
}
exports.MercadoLivreApi = MercadoLivreApi;
// Utilizando variáveis de ambiente para configuração
const baseUrl = process.env.ML_API_BASE_URL || 'http://localhost:3333/api/mercadoLivre';
const clientId = '2668378137203164';
const clientSecret = 'GZK8pllAlMoFL2GbFSkxsF6YqT9TeKTD';
const refreshToken = 'TG-66902faa56d1e70001de9398-130928655';
exports.mercadoLivreApi = new MercadoLivreApi(baseUrl, clientId, clientSecret, refreshToken);
// const baseUrl = process.env.ML_API_BASE_URL || 'http://localhost:3333/api/mercadoLivre';
// const token = process.env.ML_API_TOKEN || 'your_default_token';
