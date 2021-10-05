import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';
import Room from './Room';
import { getUser } from '../utils/utils';
import { getAll } from '../services/roomService';

function Rooms(props) {
  const [rooms, setRooms] = useState([]);
  const match = useRouteMatch();

  const getRooms = async () => {
    const newRooms = await getAll();
    console.log(newRooms);
    setRooms(newRooms);
  };

  useEffect(() => {
    getRooms();
  }, []);

  const getRoutes = rooms.map((x) => (
    <Route key={x.id} path={`${match.url}/${x.id}`}>
      <Room roomName={x.name} socket={props.socket} />
    </Route>
  ));

  const conditionalRender = () => {
    if (getUser()) {
      return (
        <Router>
          <div>
            <h2>Rooms</h2>

            <ul>
              {rooms.map((room) => (
                <li key={room.id}>
                  <Link to={`${match.url}/${room.id}`}>{room.name}</Link>
                </li>
              ))}
            </ul>

            <Switch>{getRoutes}</Switch>
          </div>
        </Router>
      );
    } else {
      return (
        <div>
          <h1>Not logged in</h1>
        </div>
      );
    }
  };

  return conditionalRender();
}

export default Rooms;
