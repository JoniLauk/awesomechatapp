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
import { FaChevronLeft, FaInfoCircle } from 'react-icons/fa';

function Rooms(props) {
  const [rooms, setRooms] = useState([]);
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const getRooms = async () => {
    const newRooms = await getAll();
    console.log(newRooms);
    setRooms(newRooms);
  };

  useEffect(() => {
    getRooms();
  }, []);

  const goBack = () => {
    history.push('/rooms');
  };

  const handleClick = () => {
    unmountComponentAtNode(document.getElementById('root'));
  };

  const getRoutes = rooms.map((x) => (
    <Route key={x.id} path={`${match.url}/${x.id}`}>
      <Room roomName={x.name} socket={props.socket} />
    </Route>
  ));

  const conditionalRender = () => {
    if (getUser()) {
      return (
        <div id="roomList">
          <div className="viewContainer">
            <div className="topBar">
              <div onClick={goBack}>
                <FaChevronLeft />
              </div>
              <div>AWESOMECHATAPP</div>
              <div className="rightIcon">
                <FaInfoCircle />
              </div>
            </div>
            <ul className="roomList">
              {rooms.map((room) => (
                <div className="roomListItem">
                  <div className="nameMessage">
                    <li key={room.id}>
                      <Link className="roomLink" to={`${match.url}/${room.id}`}>
                        {room.name}
                      </Link>
                    </li>
                    <p className="lastMessage">joni: asdf</p>
                  </div>
                  <div className="iconTime">
                    <FaChevronLeft />
                    <p>13:24</p>
                  </div>
                </div>
              ))}
            </ul>
            <div className="newRoomButton">
              <button className="newRoom">New Room</button>
            </div>
          </div>

          <Switch>{getRoutes}</Switch>
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
