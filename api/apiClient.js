import axios from 'axios';

const apiClient = axios.create({
  // é suposto substituir o 172.28.2.59 pelo IP dos vossos computadores
  // o 'localhost' é para que funcione apenas no pc local
  baseURL: 'http://172.28.2.188:3000/medifier',
  timeout: 10000,
});

export default apiClient;
