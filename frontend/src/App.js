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

  const roomProps = {
    setRoomName,
    showInfo,
    setShowInfo,
  };

  const navProps = {
    roomName,
    setShowInfo,
    showInfo,
  };

  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Nav navProps={navProps} />
        <Switch>
          <Route path="/settings">
            {getUser() ? (
              <Settings setRoomName={setRoomName} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/rooms/:id">
            <Room roomProps={roomProps} />
          </Route>
          <Route path="/rooms">
            {getUser() ? (
              <Rooms setRoomName={setRoomName} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            {getUser() ? <Redirect to="/rooms" /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    </SocketContext.Provider>
  );
}
