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
import { SocketContext, socket } from './context/socket';
import { getUser } from './utils/utils';

export default function App() {
  const [currentUser, setCurrentUser] = useState('');
  const [notContent, setNotContent] = useState('');

  useEffect(() => {
    setCurrentUser(getUser());
    console.log(`current user: ${currentUser}`);
  }, [currentUser]);

  const handleNotification = (props) => {
    const { msg } = props;
    console.log(msg);
    setNotContent(props);
    setTimeout(() => {
      setNotContent('');
    }, 3000);
  };

  return (
    <SocketContext.Provider value={socket}>
      <div>
        <Router>
          <div>
            <nav>
              <ul
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  listStyle: 'none',
                }}
              >
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
                {currentUser ? <Redirect to="/rooms" /> : <Login />}
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/rooms">
                <Rooms handleNotification={handleNotification} />
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
    </SocketContext.Provider>
  );
}
