import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logIn } from '../services/userService';
import { setToken, getUser, removeToken } from '../utils/utils';
import './stylesheets/login.css';

function Login({ handleNotification }) {
  const [user, setUser] = useState(getUser());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

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
      history.push('/rooms');
    } catch (error) {
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
        <div className="viewContainer">
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
    } else {
      return <button onClick={logout}>Log out</button>;
    }
  };

  return conditionalRender();
}

export default Login;
