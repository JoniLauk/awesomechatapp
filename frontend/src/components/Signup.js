import React, { useState } from 'react';
import { signUp } from '../services/userService';
import { setToken, handleNotification } from '../utils/utils';
import { Notification } from './Notification';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [not, setNot] = useState(false);
  const [notContent, setNotContent] = useState('');

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
      handleNotification(
        {
          message: `${username} created successfully.`,
          type: 'success',
        },
        setNot,
        setNotContent
      );
      setUsername('');
      setPassword('');
    } catch (err) {
      if (err.response.data.error) {
        handleNotification(
          {
            message: err.response.data.error,
            type: 'error',
          },
          setNot,
          setNotContent
        );
        setPassword('');
      } else {
        handleNotification(
          {
            message: err.response.data.errors,
            type: 'error',
          },
          setNot,
          setNotContent
        );
        setPassword('');
      }
    }
  };

  return (
    <div className="viewContainer">
      {not ? <Notification message={notContent} /> : ''}
      <div className="topBar">
        <div></div>
        <div>AWESOMECHATAPP</div>
        <div className="rightIcon"></div>
      </div>
      <div>
        <form className="loginForm" onSubmit={handleSignup}>
          <div className="loginFormDiv">
            <h3>Name</h3>
            <input
              type="text"
              name="name"
              onChange={handleUsername}
              value={username}
            />
          </div>
          <div className="loginFormDiv">
            <h3>Password</h3>
            <input
              type="password"
              name="password"
              onChange={handlePassword}
              value={password}
            />
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
