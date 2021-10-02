import React, { useState } from 'react';
import { logIn } from '../services/userService';
import { setToken, getUser, removeToken } from '../utils/utils';

function Login(props) {
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
      const user = await logIn({ username, password });
      setToken(user);
      setUser(user);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const logout = () => {
    setUser(null);
    removeToken();
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
