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

export default function App() {
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    setCurrentUser(getUser());
    console.log(`current user: ${currentUser}`);
  }, [currentUser]);

  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

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
          <Route path="/room">
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
