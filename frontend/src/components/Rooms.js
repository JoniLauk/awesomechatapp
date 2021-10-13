import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import Room from './Room';
import { getUser } from '../utils/utils';
import { getAll } from '../services/roomService';
import './stylesheets/rooms.css';
import { NewRoom } from './NewRoom';

function Rooms({ socket, handleNotification, setRoomName }) {
  const [rooms, setRooms] = useState([]);
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [isNewRoomVisible, setNewRoomVisible] = useState(false);

  const getRooms = async () => {
    const newRooms = await getAll();
    setRooms(newRooms);
  };

  useEffect(() => {
    setRoomName('AWESOMECHATAPP');
    getRooms();
  }, [location, setRoomName]);

  const getRoutes = rooms.map((x) => (
    <Route key={x.id} exact path={`${match.url}/${x.id}`}>
      <Room
        roomName={x.name}
        socket={socket}
        handleNotification={handleNotification}
        roomId={x.id}
      />
    </Route>
  ));

  const getNewestMessageForRoom = (room) => {
    if (room.messages.length > 0)
      return room.messages[room.messages.length - 1].content;
    else return '';
  };

  const getNewesMessagesDateForRoom = (room) => {
    if (room.messages.length > 0) {
      const date = new Date(room.messages[room.messages.length - 1].date);
      return date.toLocaleString();
    } else return '';
  };

  const handleNewRoomButton = async (event) => {
    setNewRoomVisible(true);
  };

  const conditionalRender = () => {
    if (getUser()) {
      return (
        <div className="roomListContainer">
          <ul className="roomList">
            {rooms.map((room) => (
              <Link
                className="roomListItem"
                to={`${match.url}/${room.id}`}
                key={room.id}
                onClick={() => setRoomName(room.name)}
              >
                <div className="nameMessage">
                  <h2 className="roomLink" to={`${match.url}/${room.id}`}>
                    {room.name}
                  </h2>
                </div>
                <div className="iconTime">
                  <p className="lastMessage">{getNewestMessageForRoom(room)}</p>
                  <p>{getNewesMessagesDateForRoom(room)}</p>
                </div>
              </Link>
            ))}
          </ul>
          <div className="newRoomButton">
            <button className="newRoom" onClick={handleNewRoomButton}>
              New Room
            </button>
          </div>
          <Switch>{getRoutes}</Switch>
          <NewRoom
            isNewRoomVisible={isNewRoomVisible}
            setNewRoomVisible={setNewRoomVisible}
            rooms={rooms}
            setRooms={setRooms}
          />
        </div>
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
