import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { signUp } from '../services/userService';
import { setToken, handleNotification } from '../utils/utils';
import { Notification } from './Notification';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup({ setRoomName }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [not, setNot] = useState(false);
  const [notContent, setNotContent] = useState('');
  const [pwIcon, setPWIcon] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setRoomName('SIGN UP');
  });

  const handleUsername = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  function togglePassword() {
    const x = document.getElementById('password');
    if (x.type === 'password') {
      x.type = 'text';
      setPWIcon(true);
    } else {
      x.type = 'password';
      setPWIcon(false);
    }
  }

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
      history.push('/rooms');
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
    <div>
      {not ? <Notification message={notContent} /> : ''}
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
              id="password"
              onChange={handlePassword}
              value={password}
            />
            {pwIcon ? (
              <FaEyeSlash
                id="pwIcon"
                className="pwIcon"
                onClick={togglePassword}
              />
            ) : (
              <FaEye id="pwIcon" className="pwIcon" onClick={togglePassword} />
            )}
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
