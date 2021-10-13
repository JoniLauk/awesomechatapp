import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { deleteAccount } from '../services/userService';
import {
  getUser,
  removeToken,
  getUserId,
  handleNotification,
  setColorScheme,
} from '../utils/utils';
import { ChangePassword } from './ChangePassword';
import { Notification } from './Notification';

function Settings({ setRoomName }) {
  const history = useHistory();
  const [user, setUser] = useState(getUser());
  const [userId, setUserId] = useState(getUserId());
  const [not, setNot] = useState(false);
  const [notContent, setNotContent] = useState('');
  const myStorage = window.localStorage;
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(
    myStorage.getItem('currentTheme')
  );

  useEffect(() => {
    setRoomName('SETTINGS');
  });

  const logout = () => {
    setUser(null);
    removeToken();
    setRoomName('AWESOMECHATAPP');
    setColorScheme('nightly');
    history.push('/login');
  };

  const deleteCurrentAccount = async (event) => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      try {
        await deleteAccount({ userId });
        setUser(null);
        removeToken();
        setColorScheme('nightly');
        history.push('/login');
        handleNotification(
          {
            message: `Account deleted successfully.`,
            type: 'success',
          },
          setNot,
          setNotContent
        );
      } catch (error) {
        if (error.response.data.errors) {
          handleNotification(
            {
              message: 'Error',
              type: 'error',
            },
            setNot,
            setNotContent
          );
        }
      }
    }
  };

  const handleTheme = (event) => {
    myStorage.setItem('currentTheme', event.target.value);
    setCurrentTheme({ value: event.target.value });
    document.documentElement.className = '';
    document.documentElement.classList.add(
      `theme-${myStorage.getItem('currentTheme')}`
    );
  };

  const handlePasswordChangeButton = () => {
    setIsChangePasswordVisible(true);
  };

  const conditionalRender = () => {
    if (user) {
      return (
        <div>
          {not ? <Notification message={notContent} /> : ''}
          <div className="settings">
            <h2>Choose a theme</h2>
            <select
              name="themes"
              id="themes"
              value={myStorage.getItem('currentTheme')}
              onChange={handleTheme}
            >
              <option value="nightly">nightly</option>
              <option value="brome">brome</option>
            </select>
            <button
              className="settingsButton"
              onClick={handlePasswordChangeButton}
            >
              Change password
            </button>
            <button className="settingsButton" onClick={logout}>
              Logout
            </button>
            <button className="settingsButton" onClick={deleteCurrentAccount}>
              Delete account
            </button>
          </div>
          <ChangePassword
            setIsChangePasswordVisible={setIsChangePasswordVisible}
            isChangePasswordVisible={isChangePasswordVisible}
          />
        </div>
      );
    } else {
      return <h1>Not logged in</h1>;
    }
  };

  return conditionalRender();
}

export default Settings;
