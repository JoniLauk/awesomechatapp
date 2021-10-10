import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Settings, Rooms, Login, Signup } from './index';
import { SocketContext, socket } from './context/socket';
import { getUser } from './utils/utils';
import './components/stylesheets/app.css';

/**
 * Main component of the app. Renders Router component which handles routing inside the app.
 * @returns Router component.
 */
export default function App() {
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

  return (
    <SocketContext.Provider value={socket}>
      <div>
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
