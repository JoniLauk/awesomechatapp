import React from 'react';
import { FaChevronLeft, FaInfoCircle } from 'react-icons/fa';
import './stylesheets/infocomponent.css';

export const InfoComponent = (props) => {
  const { setShowInfo, connectedUsers, roomName } = props;
  return (
    <div className="viewContainer">
      <div className="topBar">
        <div>
          <FaChevronLeft onClick={() => setShowInfo()} />
        </div>
        <div className="roomName">{roomName}</div>
        <div className="rightIcon">
          <FaInfoCircle />
        </div>
      </div>
      <div className="infoContainer">
        <h2>Info</h2>
        <h3>Connected users:</h3>
        <ul>
          {connectedUsers.map((x) => (
            <li key={x.id}>{x.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
