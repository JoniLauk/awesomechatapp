import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Home, Settings, Rooms, Room, Login, Signup } from './index';
import { SocketContext, socket } from './context/socket';
import { getUser } from './utils/utils';
import './components/stylesheets/app.css';
import './components/stylesheets/notification.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState('');
  const myStorage = window.localStorage;

  useEffect(() => {
    setCurrentUser(getUser());
  }, [currentUser]);

  console.log(currentUser);

  useEffect(() => {
    if (!myStorage.getItem('currentTheme')) {
      myStorage.setItem('currentTheme', 'nightly');
    }
    document.documentElement.className = '';
    document.documentElement.classList.add(
      `theme-${myStorage.getItem('currentTheme')}`
    );
  });

  return (
    <SocketContext.Provider value={socket}>
      <div>
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Router>
          <Switch>
            <Route path="/settings">
              {getUser() ? <Settings /> : <Redirect to="/login" />}
            </Route>
            <Route path="/rooms">
              {getUser() ? <Rooms /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              {getUser() ? <Rooms /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </Router>
      </div>
    </SocketContext.Provider>
  );
}
