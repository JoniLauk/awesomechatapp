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
import { getAll, addNewRoom } from '../services/roomService';
import { FaChevronLeft, FaCog } from 'react-icons/fa';
import './stylesheets/rooms.css';
import { Nav } from './Nav';
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

    //await addNewRoom('asdf');
    //const newRooms = await getAll();
    //setRooms(newRooms);
  };

  const conditionalRender = () => {
    if (getUser()) {
      return (
        <div className="roomListContainer">
          {/* <div className="topBar">
                <div onClick={goBack}>
                  <FaChevronLeft />
                </div>
                <div>AWESOMECHATAPP</div>
                <div className="rightIcon" onClick={goSettings}>
                  <FaCog />
                </div>
              </div> */}
          <ul className="roomList">
            {rooms.map((room) => (
              <Link
                className="roomListItem"
                to={`${match.url}/${room.id}`}
                key={room.id}
                onClick={() => setRoomName(room.name)}
              >
                <div className="nameMessage">
                  <Link className="roomLink" to={`${match.url}/${room.id}`}>
                    {room.name}
                  </Link>
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
