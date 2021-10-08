import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Home, Settings, Rooms, Room, Login, Signup } from './index';
import { io } from 'socket.io-client';
import { getUser } from './utils/utils';
import './components/stylesheets/app.css';

export default function App() {
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const myStorage = window.localStorage;

  useEffect(() => {
    setCurrentUser(getUser());
    console.log(`current user: ${currentUser}`);
  }, [currentUser]);

  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

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
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            {currentUser ? <Redirect to="/rooms" /> : <Home socket={socket} />}
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/rooms">
            <Rooms socket={socket} />
          </Route>
          <Route path="/rooms:">
            <Room />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
