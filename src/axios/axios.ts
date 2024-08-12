
import axios from "axios";

// Verificar se as variáveis de ambiente estão definidas
const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
    throw new Error("Missing required environment variables");
}

// Função para obter o token do localStorage
const getAuthToken = () => localStorage.getItem('refreshToken');


// Função para definir o token no localStorage
// const getRefreshToken = () => localStorage.getItem('refreshToken');
// const setAuthToken = (token: string) => localStorage.setItem('authToken', token);

// // Função para renovar o token de acesso
// const refreshAccessToken = async () => {
//     try {
//         const refreshToken = getRefreshToken();
//         if (!refreshToken) {
//             throw new Error('No refresh token available');
//         }

//         const response = await axios.post(`${apiUrl}/refresh`, { refreshToken });
//         const { accessToken } = response.data;

//         setAuthToken(accessToken);
//         return accessToken;
//     } catch (error) {
//         console.error('Failed to refresh token:', error.response?.data?.message || error.message);
//         throw error;
//     }
// };

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Adicionar interceptador para incluir o token nas requisições
api.interceptors.request.use(
  config => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Adicionar interceptador para tratamento de resposta e renovação do token
api.interceptors.response.use(
  response => response,
  async error => {
    // CASO A API RETORNE 404 ELE VAI LIMPAR O TOKEN E RETONAR PARA A LOGIN
    if (error.response?.status === 401 && error.response?.data?.message === 'Token expired') {
        // const originalRequest = error.config;
        // try {
        //   //Chamo ele mesmo e repasso o token
        //     const newAccessToken = await refreshAccessToken();
        //     originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        //     return api(originalRequest); // Repetir a requisição original com o novo token
        // } catch (refreshError) {
        //     // Redirecionar para login ou exibir mensagem de erro
        //     message.error('Error refreshing access token:', refreshError.response?.data?.message || refreshError.message);
        //     // redirecionar para a página de login ou limpar os tokens
        //     window.location.href = '/login'; //  redirecionamento para a página de login
        // }
        window.location.href = '/login'; 
    }

    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
