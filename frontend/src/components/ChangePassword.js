import React, { useState, useEffect } from 'react';
import { setToken, getUser, handleNotification } from '../utils/utils';

export const ChangePassword = (props) => {
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(getUser());
  const [newPassword, setNewPassword] = useState('');

  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleNewPassword = (event) => {
    event.preventDefault();
    setNewPassword(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
  };

  return (
    <div className="changePassword">
      <form className="changePasswordForm" onSubmit={handlePasswordChange}>
        <div className="loginFormDiv">
          <h3>Name</h3>
          <input
            id="login-form-username-input"
            type="password"
            name="password"
            onChange={handlePassword}
            value={password}
          />
        </div>
        <div className="loginFormDiv">
          <h3>Password</h3>
          <input
            type="newPassword"
            name="newPassword"
            onChange={handleNewPassword}
            value={newPassword}
          />
        </div>
        <div className="changePasswordFormSubmit">
          <input type="submit" value="Confirm" />
          <div className="formInstructions">
            <p>Don’t have account yet?</p>
            <a className="formLink" href="/signup">
              Sign up now!
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
