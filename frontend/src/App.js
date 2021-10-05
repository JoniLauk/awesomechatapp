import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Home, Settings, Rooms, Room, Login, Signup } from './index';
import { Notification } from './components/Notification';
import { io } from 'socket.io-client';
import { getUser } from './utils/utils';

export default function App() {
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [notContent, setNotContent] = useState('');

  useEffect(() => {
    setCurrentUser(getUser());
    console.log(`current user: ${currentUser}`);
  }, [currentUser]);

  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  const handleNotification = (props) => {
    setNotContent(props);
    setTimeout(() => {
      setNotContent('');
    }, 3000);
  };

  return (
    <div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
              <li>
                <Link to="/rooms">Rooms</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              {currentUser ? (
                <Redirect to="/rooms" />
              ) : (
                <Home socket={socket} />
              )}
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/rooms">
              <Rooms socket={socket} />
            </Route>
            <Route path="/room">
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
        </div>
      </Router>
      {notContent === '' ? '' : <Notification message={notContent} />}
    </div>
  );
}
