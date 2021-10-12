import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { FaChevronLeft, FaMoon, FaUser } from 'react-icons/fa';
import { logIn } from '../services/userService';
import { setToken, getUser, removeToken } from '../utils/utils';
import { ReactDOM } from 'react';

function Settings({ setRoomName }) {
  const history = useHistory();
  const [user, setUser] = useState(getUser());
  const myStorage = window.localStorage;
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
    history.push('/login');
  };

  const handleTheme = (event) => {
    myStorage.setItem('currentTheme', event.target.value);
    setCurrentTheme({ value: event.target.value });
    document.documentElement.className = '';
    document.documentElement.classList.add(
      `theme-${myStorage.getItem('currentTheme')}`
    );
  };

  const conditionalRender = () => {
    if (user) {
      return (
        <div className="viewContainer">
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
            <button className="settingsButton">Change password</button>
            <button className="settingsButton" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      );
    } else {
      return <h1>Not logged in</h1>;
    }
  };

  return conditionalRender();
}

export default Settings;
