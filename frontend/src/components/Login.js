import React, { useState } from 'react';
import { logIn } from '../services/userService';
import { setToken } from '../utils/utils';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const newUser = {
      username,
      password,
    };
    const token = await logIn(newUser);
    setToken(token);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleUsername} />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={handlePassword} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
