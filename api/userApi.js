import apiClient from './apiClient';

export const createUser = async (userData) => {
  const response = await apiClient.post('/users', userData);
  return response.data;
};

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response ? error.response.data : error.message);
    throw error; 
  }
};
