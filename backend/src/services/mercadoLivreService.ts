import { mercadoLivreApi } from '../integrations/mercadoLivreApi';

export class MercadoLivreService {
    async fetchApplicationInfo(): Promise<any> {
        try {
            const applicationInfo = await mercadoLivreApi.getApplicationInfo();
            // Faça algo com a resposta aqui, como processar ou armazenar os dados.
            return applicationInfo;
        } catch (error) {
            throw new Error(`Failed to fetch application info: ${error}`);
        }
    }
}
