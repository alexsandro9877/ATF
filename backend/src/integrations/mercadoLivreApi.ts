import axios from 'axios';

export class MercadoLivreApi {
    private baseUrl: string;
    private clientId: string;
    private clientSecret: string;
    private refreshToken: string;
    private accessToken: string | null = null;

    constructor(baseUrl: string, clientId: string, clientSecret: string, refreshToken: string) {
        this.baseUrl = baseUrl;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.refreshToken = refreshToken;
    }

    async authenticate(): Promise<void> {
        try {
            const response = await axios.post(
                'https://api.mercadolibre.com/oauth/token',
                `grant_type=refresh_token&client_id=${this.clientId}&client_secret=${this.clientSecret}&refresh_token=${this.refreshToken}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                this.accessToken = response.data.access_token;
            } else {
                throw new Error('Failed to authenticate');
            }
        } catch (error) {
            throw new Error(`Error authenticating with Mercado Livre API: ${error}`);
        }
    }

    async getApplicationInfo(): Promise<any> {
        if (!this.accessToken) {
            await this.authenticate();
        }

        try {
            const response = await axios.get(`${this.baseUrl}/applications/2668378137203164`, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch application info: ${error}`);
        }
    }
}

// Utilizando variáveis de ambiente para configuração
const baseUrl = process.env.ML_API_BASE_URL || 'http://localhost:3333/api/mercadoLivre';
const clientId = '2668378137203164';
const clientSecret = 'GZK8pllAlMoFL2GbFSkxsF6YqT9TeKTD';
const refreshToken = 'TG-66902faa56d1e70001de9398-130928655';

export const mercadoLivreApi = new MercadoLivreApi(baseUrl, clientId, clientSecret, refreshToken);

// const baseUrl = process.env.ML_API_BASE_URL || 'http://localhost:3333/api/mercadoLivre';
// const token = process.env.ML_API_TOKEN || 'your_default_token';


