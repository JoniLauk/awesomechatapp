import React, { useState } from 'react';
import { signUp } from '../services/userService';

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

  const handleSignup = (event) => {
    event.preventDefault();
    signUp({ username, password });
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
