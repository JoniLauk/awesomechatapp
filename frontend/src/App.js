import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Home, Settings, Rooms, Room, Login, Signup } from './index';
import { SocketContext, socket } from './context/socket';
import { Notification } from './components/Notification';
import { getUser } from './utils/utils';
import './components/stylesheets/app.css';
import './components/stylesheets/notification.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState('');
  const myStorage = window.localStorage;
  const [notContent, setNotContent] = useState('');

  useEffect(() => {
    setCurrentUser(getUser());
  }, [currentUser]);

  const handleNotification = (props) => {
    const { message } = props;
    console.log(message);
    setNotContent(props);
    // setTimeout(() => {
    //   setNotContent('');
    // }, 3000);
  };

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
        {notContent === '' ? '' : <Notification message={notContent} />}
        <Router>
          <Switch>
            <Route exact path="/">
              {currentUser ? (
                <Redirect to="/rooms" />
              ) : (
                <Login setCurrentUser={setCurrentUser} />
              )}
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/rooms">{currentUser ? <Rooms /> : <Login />}</Route>
            <Route path="/login">
              <Login setCurrentUser={setCurrentUser} />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </SocketContext.Provider>
  );
}
