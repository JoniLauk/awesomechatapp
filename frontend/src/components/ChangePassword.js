import React, { useState, useEffect } from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { getUser, handleNotification } from '../utils/utils';
import { changeUserpassword } from '../services/userService';
import { Notification } from './Notification';

export const ChangePassword = ({
  setIsChangePasswordVisible,
  isChangePasswordVisible,
}) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [user, setUser] = useState(getUser());
  const [not, setNot] = useState(false);
  const [notContent, setNotContent] = useState('');

  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleNewPassword = (event) => {
    event.preventDefault();
    setNewPassword(event.target.value);
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    try {
      await changeUserpassword({
        password,
        newPassword,
        user,
      });
      setIsChangePasswordVisible(false);
      setPassword('');
      setNewPassword('');
      handleNotification(
        {
          message: `Password changed successfully.`,
          type: 'success',
        },
        setNot,
        setNotContent
      );
    } catch (error) {
      if (error.response.data.errors) {
        handleNotification(
          {
            message: 'Check old and new password',
            type: 'error',
          },
          setNot,
          setNotContent
        );
      }
    }
  };

  const cancelPasswordChange = () => {
    setIsChangePasswordVisible(false);
    setPassword('');
    setNewPassword('');
  };

  const conditionalRender = () => {
    if (isChangePasswordVisible) {
      return (
        <div className="changePassword">
          {not ? <Notification message={notContent}></Notification> : ''}
          <form className="changePasswordForm" onSubmit={handlePasswordChange}>
            <h2>Change password</h2>
            <div className="loginFormDiv">
              <h3>Password</h3>
              <input
                id="login-form-username-input"
                type="password"
                name="password"
                onChange={handlePassword}
                value={password}
              />
            </div>
            <div className="loginFormDiv">
              <h3>New password</h3>
              <input
                type="password"
                name="newPassword"
                onChange={handleNewPassword}
                value={newPassword}
              />
            </div>
            <input type="submit" value="Confirm" />
          </form>
          <button onClick={cancelPasswordChange}>Cancel</button>
        </div>
      );
    } else {
      return null;
    }
  };

  return conditionalRender();
};
