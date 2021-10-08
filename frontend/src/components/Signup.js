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
        message: `${username} created successfully.`,
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
    <div className="viewContainer">
      <div className="topBar">
        <div></div>
        <div>AWESOMECHATAPP</div>
        <div className="rightIcon"></div>
      </div>
      <div>
        <form className="loginForm" onSubmit={handleSignup}>
          <div className="loginFormDiv">
            <h3>Name</h3>
            <input type="text" name="name" onChange={handleUsername} />
          </div>
          <div className="loginFormDiv">
            <h3>Password</h3>
            <input type="password" name="password" onChange={handlePassword} />
          </div>
          <div className="loginFormSubmit">
            <input type="submit" value="SIGNUP" />
            <div className="formInstructions">
              <p>Already have an account?</p>
              <a className="formLink" href="/login">
                Log in!
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
