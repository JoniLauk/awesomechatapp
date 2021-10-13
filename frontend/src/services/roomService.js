import axios from 'axios';
import { getToken } from '../utils/utils';

let url = 'http://localhost:4000/api/rooms';

if (process.env.NODE_ENV === 'production') {
  url = '/api/rooms';
}

export const getAll = async () => {
  const response = await axios.get(url, {
    headers: { authorization: `bearer ${getToken()}` },
  });
  return response.data;
};

export const getRoomName = async (id) => {
  const response = await axios.get(`${url}/${id}`, {
    headers: { authorization: `bearer ${getToken()}` },
  });
  return response.data;
};

export const addNewRoom = async (name) => {
  console.log(name);
  const response = await axios.post(
    `${url}/`,
    { name: name.newRoomName },
    {
      headers: { authorization: `bearer ${getToken()}` },
    }
  );
  return response.data;
};
