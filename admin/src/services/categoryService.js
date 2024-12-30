import axios from 'axios';

const API_URL = '/api/categories'; // Adjust the URL according to your backend setup

export const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addCategory = async (categoryName) => {
  const response = await axios.post(API_URL, { name: categoryName });
  return response.data;
};

export const removeCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}; 