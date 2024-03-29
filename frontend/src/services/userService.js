import axios from 'axios';

let url = 'http://localhost:4000/api/';

if (process.env.NODE_ENV === 'production') {
  url = '/api/';
}

export const logIn = async (user) => {
  const response = await axios.post(`${url}login`, user);
  return response.data;
};

export const signUp = async (user) => {
  const response = await axios.post(`${url}users`, user);
  return response.data;
};

export const changeUserpassword = async (user) => {
  const response = await axios.put(`${url}users/`, user);
  return response.data;
};

export const deleteAccount = async (userId) => {
  console.log(userId);
  const response = await axios.delete(`${url}users/${userId.userId}`);
  return response.data;
};
