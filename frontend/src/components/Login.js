import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { logIn } from '../services/userService';
import { setToken, getUser, handleNotification } from '../utils/utils';
import { Notification } from './Notification';
import './stylesheets/login.css';

function Login() {
  const [user, setUser] = useState(getUser());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [not, setNot] = useState(false);
  const [notContent, setNotContent] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (user) history.push('/rooms');
  });

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
      resetCreds();
      history.push('/rooms');
    } catch (error) {
      if (error.response) {
        handleNotification(
          {
            message: error.response.data.error,
            type: 'error',
          },
          setNot,
          setNotContent
        );
      }
      resetCreds();
    }
  };

  const resetCreds = () => {
    setPassword('');
    setUsername('');
  };

  const conditionalRender = () => {
    return (
      <div className="viewContainer">
        {not ? <Notification message={notContent}></Notification> : ''}
        <div className="topBar">
          <div></div>
          <div>AWESOMECHATAPP</div>
          <div className="rightIcon"></div>
        </div>
        <div>
          <form className="loginForm" onSubmit={handleLogin}>
            <div className="loginFormDiv">
              <h3>Name</h3>
              <input
                id="login-form-username-input"
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
              <input type="submit" value="LOGIN" />
              <div className="formInstructions">
                <p>Don’t have account yet?</p>
                <a className="formLink" href="/signup">
                  Sign up now!
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return conditionalRender();
}

export default Login;
