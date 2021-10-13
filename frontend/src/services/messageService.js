import axios from 'axios';
import { getToken } from '../utils/utils';

let url = 'http://localhost:4000/api/messages';

if (process.env.NODE_ENV === 'production') {
  url = '/api/messages';
}

export const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

export const getAllMessagesForRoom = async (roomId) => {
  const response = await axios.get(url, {
    params: { roomId },
    headers: { authorization: `bearer ${getToken()}` },
  });
  return response.data;
};

export const create = async (message) => {
  const response = await axios.post(url, message);
  return response.data;
};

export const modify = async (message) => {
  const response = await axios.put(`${url}/${message.id}`, message);
  return response.data;
};
