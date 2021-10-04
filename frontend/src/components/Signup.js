import React, { useState } from 'react';
import { logIn, signUp } from '../services/userService';
import { setToken } from '../utils/utils';

function Signup(props) {
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
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
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

export default Signup;
