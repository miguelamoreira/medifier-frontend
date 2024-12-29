import axios from 'axios';

const apiClient = axios.create({
  // é suposto substituir o 172.28.2.59 pelo IP dos vossos computadores
  // o 'localhost' é para que funcione apenas no pc local
  //baseURL: 'http://172.28.2.188:3000/medifier',
  //baseURL: 'http://192.168.1.71:3000/medifier',
  baseURL: 'http://192.168.1.85:3000/medifier', //sofia para eu me lembrar q este é meu lol
  timeout: 10000,
});

export default apiClient;
