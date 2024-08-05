import axios from "axios";

// Verificar se as variáveis de ambiente estão definidas
const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
    throw new Error("Missing required environment variables");
}

// Função para obter o token do localStorage
const getAuthToken = () => localStorage.getItem('authToken');

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

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

//Adicionar tratamento de erro para requisições
api.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

 export default api;
