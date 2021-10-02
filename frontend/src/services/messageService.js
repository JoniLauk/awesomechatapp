import axios from 'axios';

const url = 'http://localhost:4000/api/messages';

export const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

export const create = async (message) => {
  const response = await axios.post(url, message);
  return response.data;
};
