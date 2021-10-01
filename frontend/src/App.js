import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Home, Settings, Rooms, Room, Login, Signup } from "./index";

export default function App() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    setCurrentUser(window.localStorage.getItem("currentUser"));
    console.log(currentUser);
  }, [currentUser]);

  return (
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
            {currentUser ? <Redirect to="/rooms" /> : <Home />}
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/rooms">
            <Rooms />
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
