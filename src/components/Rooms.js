import React, { useState } from "react";
import {
  BrowserRouter as Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Room from "./Room.js";

function Rooms(props) {
  const [rooms, setRooms] = useState([
    { name: "HAIPPIRINKI", id: 1 },
    { name: "Batcave", id: 2 },
  ]);
  const match = useRouteMatch();

  return (
    <div>
      <h2>Rooms</h2>

      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <Link to={`${match.url}:${room.id}`}>{room.name}</Link>
          </li>
        ))}
      </ul>

      <Switch>
        <Route path={`${match.path}/:roomId`}>
          <Room />
        </Route>
        <Route path={match.path}>
          <h3>Please select a room</h3>
        </Route>
      </Switch>
    </div>
  );
}

export default Rooms;
