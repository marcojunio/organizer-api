import axios from 'axios';

// Configuração base do Axios
const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;