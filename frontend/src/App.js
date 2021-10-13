import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Settings, Rooms, Room, Login, Signup } from './index';
import { SocketContext, socket } from './context/socket';
import { getUser } from './utils/utils';
import { Nav } from './components/Nav';
import './components/stylesheets/app.css';

/**
 * Main component of the app. Renders Router component which handles routing inside the app.
 * @returns Router component.
 */
export default function App() {
  const [roomName, setRoomName] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const myStorage = window.localStorage;

  /**
   * Retrieves selected theme from browsers local-storage.
   */
  useEffect(() => {
    if (!myStorage.getItem('currentTheme')) {
      myStorage.setItem('currentTheme', 'nightly');
    }
    document.documentElement.className = '';
    document.documentElement.classList.add(
      `theme-${myStorage.getItem('currentTheme')}`
    );
  });

  useEffect(() => {
    setCurrentUser(getUser());
  }, []);

  useEffect(() => {
    setRoomName('AWESOMECHATAPP');
  }, [setRoomName]);

  const roomProps = {
    setRoomName,
    showInfo,
    setShowInfo,
  };

  const navProps = {
    roomName,
    setRoomName,
    setShowInfo,
    showInfo,
  };

  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Nav navProps={navProps} />
        <Switch>
          <Route path="/settings">
            {currentUser ? (
              <Settings setRoomName={setRoomName} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/rooms/:id">
            <Room roomProps={roomProps} />
          </Route>
          <Route path="/rooms">
            {currentUser ? (
              <Rooms setRoomName={setRoomName} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/login">
            <Login setCurrentUser={setCurrentUser} setRoomName={setRoomName} />
          </Route>
          <Route path="/signup">
            <Signup setRoomName={setRoomName} />
          </Route>
          <Route path="/">
            {currentUser ? <Redirect to="/rooms" /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    </SocketContext.Provider>
  );
}
