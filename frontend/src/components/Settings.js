import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { FaChevronLeft, FaMoon, FaUser } from 'react-icons/fa';
import { logIn } from '../services/userService';
import { setToken, getUser, removeToken } from '../utils/utils';
import { ReactDOM } from 'react';
import './stylesheets/toggle.css';

function Settings(props) {
  const history = useHistory();
  const [user, setUser] = useState(getUser());
  const myStorage = window.localStorage;
  const [currentTheme, setCurrentTheme] = useState(
    myStorage.getItem('currentTheme')
  );

  const goBack = () => {
    history.push('/rooms');
  };

  const logout = () => {
    setUser(null);
    removeToken();
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

  return (
    <div className="viewContainer">
      <div className="topBar">
        <div onClick={goBack}>
          <FaChevronLeft />
        </div>
        <div>AWESOMECHATAPP</div>
        <div className="rightIcon"></div>
      </div>
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
}

export default Settings;
