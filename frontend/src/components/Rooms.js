import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { unmountComponentAtNode } from 'react-dom';
import Room from './Room';
import { getUser } from '../utils/utils';
import { getAll } from '../services/roomService';
import { FaChevronLeft, FaInfoCircle, FaCog } from 'react-icons/fa';
import './stylesheets/rooms.css';

function Rooms({ socket, handleNotification }) {
  const [rooms, setRooms] = useState([]);
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const getRooms = async () => {
    const newRooms = await getAll();
    setRooms(newRooms);
  };

  useEffect(() => {
    getRooms();
  }, [location]);

  const goBack = () => {
    history.push('/rooms');
  };

  const goSettings = () => {
    history.push('/settings');
  };

  const handleClick = () => {
    unmountComponentAtNode(document.getElementById('roomList'));
  };

  const getRoutes = rooms.map((x) => (
    <Route key={x.id} path={`${match.url}/${x.id}`}>
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

  const conditionalRender = () => {
    if (getUser()) {
      return (
        <Router>
          <div id="roomList">
            <div className="viewContainer">
              <div className="topBar">
                <div onClick={goBack}>
                  <FaChevronLeft />
                </div>
                <div>AWESOMECHATAPP</div>
                <div className="rightIcon" onClick={goSettings}>
                  <FaCog />
                </div>
              </div>
              <ul className="roomList">
                {rooms.map((room) => (
                  <Link
                    key={room.id}
                    className="roomListItem"
                    to={`${match.url}/${room.id}`}
                  >
                    <div className="nameMessage">
                      <Link className="roomLink" to={`${match.url}/${room.id}`}>
                        {room.name}{' '}
                      </Link>
                      <p className="lastMessage">
                        {getNewestMessageForRoom(room)}
                      </p>
                    </div>
                    <div className="iconTime">
                      <FaChevronLeft />
                      <p>{getNewesMessagesDateForRoom(room)}</p>
                    </div>
                  </Link>
                ))}
              </ul>
              <div className="newRoomButton">
                <button className="newRoom">New Room</button>
              </div>
            </div>
          </div>
          <Switch>{getRoutes}</Switch>
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
