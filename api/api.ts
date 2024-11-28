import axios from 'axios';

// url base
const API_BASE_URL = 'http://192.168.243.1:3000/medifier'; // esta ip deve ser mudada dependendo da vossa rede

// config do axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para enviar os dados para o backend
export const publishMessage = async (topic: string, message: string) => {
  try {
    const response = await api.post('/publish', { topic, message });
    console.log('Mensaje publicado:', response.data);
  } catch (error) {
    console.error('Error publicando mensaje:', error);
  }
};
