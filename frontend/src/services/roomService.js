import axios from 'axios';
import { getToken } from '../utils/utils';

const url = 'http://localhost:4000/api/rooms';

export const getAll = async () => {
  const response = await axios.get(url, {
    headers: { authorization: `bearer ${getToken()}` },
  });
  return response.data;
};
