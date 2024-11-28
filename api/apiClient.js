import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/medifier',
  timeout: 5000,
});

export default apiClient;
