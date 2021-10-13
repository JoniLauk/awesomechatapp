import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { logIn } from '../services/userService';
import { setToken, getUser, handleNotification } from '../utils/utils';
import { Notification } from './Notification';
import './stylesheets/login.css';

function Login({ setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [not, setNot] = useState(false);
  const [notContent, setNotContent] = useState('');
  const history = useHistory();

  /**
   * Hanldes username field in the login form. Adds username
   * to username state object.
   * @param {*} event onChange event
   */
  const handleUsername = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  /**
   * Hanles password field in the login form. Adds password
   * to password state object.
   * @param {*} event
   */
  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  /**
   * Login forms submit action. Logs user in based on the credentials
   * provided.
   * @param {*} event
   */
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginUser = await logIn({ username, password });
      setToken(loginUser);
      setCurrentUser(loginUser);
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

  /**
   * Reset input fields.
   */
  const resetCreds = () => {
    setPassword('');
    setUsername('');
  };

  return (
    <div className="viewContainer">
      {not ? <Notification message={notContent}></Notification> : ''}
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
}

export default Login;
