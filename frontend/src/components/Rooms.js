import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';
import Room from './Room';

function Rooms(props) {
  const [rooms, setRooms] = useState([
    { name: 'HAIPPIRINKI', id: 1 },
    { name: 'Batcave', id: 2 },
  ]);
  const match = useRouteMatch();

  const getRoutes = rooms.map((x) => (
    <Route key={x.id} path={`${match.url}/${x.id}`}>
      <Room roomName={x.name} socket={props.socket} />
    </Route>
  ));

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
}

export default Rooms;
