import axios from 'axios';

const url = 'http://localhost:4000/api/';

export const logIn = async (user) => {
  const response = await axios.post(`${url}login`, user);
  return response.data;
};

export const signUp = async (user) => {
  console.log(user);
  const response = await axios.post(`${url}users`, user);
  return response.data;
};
