import React, { useState } from 'react';
import { signUp } from '../services/userService';
import { setToken } from '../utils/utils';

function Signup({ handleNotification }) {
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

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const user = await signUp({ username, password });
      setToken(user);
      handleNotification({
        message: [{ msg: `${username} created successfully.` }],
        type: 'success',
      });
      setUsername('');
      setPassword('');
    } catch (err) {
      if (err.response.data.error) {
        handleNotification({
          message: err.response.data.error,
          type: 'error',
        });
        setPassword('');
      } else {
        handleNotification({
          message: err.response.data.errors,
          type: 'error',
        });
        setPassword('');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={username}
            onChange={handleUsername}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Signup;
