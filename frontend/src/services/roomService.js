import axios from 'axios';
import { getToken } from '../utils/utils';

const url = 'http://localhost:4000/api/rooms';

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
