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

export default function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [notContent, setNotContent] = useState('');

  useEffect(() => {
    setCurrentUser(getUser());
    console.log(`current user: ${currentUser}`);
  }, [currentUser]);

  const handleNotification = (props) => {
    const { message } = props;
    console.log(message);
    setNotContent(props);
    setTimeout(() => {
      setNotContent('');
    }, 3000);
  };

  return (
    <SocketContext.Provider value={socket}>
      <div>
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Router>
          <Switch>
            <Route exact path="/">
              {currentUser ? (
                <Redirect to="/rooms" />
              ) : (
                <Login handleNotification={handleNotification} />
              )}
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/rooms">
              {currentUser ? (
                <Rooms handleNotification={handleNotification} />
              ) : (
                <Login handleNotification={handleNotification} />
              )}
            </Route>
            <Route path="/rooms:">
              <Room />
            </Route>
            <Route path="/login">
              <Login handleNotification={handleNotification} />
            </Route>
            <Route path="/signup">
              <Signup handleNotification={handleNotification} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
        {notContent === '' ? '' : <Notification message={notContent} />}
      </div>
    </SocketContext.Provider>
  );
}
