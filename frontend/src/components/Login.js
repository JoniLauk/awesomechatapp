import React, { useState } from 'react';
import { logIn } from '../services/userService';
import { setToken, getUser, removeToken } from '../utils/utils';

function Login({ handleNotification }) {
  const [user, setUser] = useState(getUser());
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
    try {
      const loginUser = await logIn({ username, password });
      setToken(loginUser);
      setUser(loginUser);
      handleNotification({
        message: `${loginUser.username} logged in!`,
        type: 'success',
      });
      resetCreds();
    } catch (error) {
      console.log(error);
      handleNotification({
        message: error.response.data.error,
        type: 'error',
      });
      resetCreds();
    }
  };

  const logout = () => {
    setUser(null);
    resetCreds();
    removeToken();
  };

  const resetCreds = () => {
    setPassword('');
    setUsername('');
  };

  const conditionalRender = () => {
    if (!user) {
      return (
        <div>
          <form onSubmit={handleLogin}>
            <label>
              Name:
              <input type="text" name="name" onChange={handleUsername} />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                onChange={handlePassword}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return <button onClick={logout}>Log out</button>;
    }
  };

  return conditionalRender();
}

export default Login;
