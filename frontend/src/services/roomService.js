import axios from 'axios';

const url = 'http://localhost:4000/api/rooms';

export const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};
