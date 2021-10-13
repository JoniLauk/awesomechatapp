import React from 'react';
import './stylesheets/infocomponent.css';

/**
 * Displays information about the room which user has selected. Currently only shows
 * connected users. Users array and room name are passed via props to this component.
 * setShowInfo is state passed from parent. It is used to control visibility of this
 * component.
 * @param {*} props
 * @returns InfoComponent
 */
export const InfoComponent = (props) => {
  const testArr = () => {
    let arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push(i);
    }
    return arr;
  };

  const arr = testArr();

  const { setShowInfo, connectedUsers, roomName } = props;
  console.log(connectedUsers);
  return (
    <div className="infoContainer">
      <h1>Info</h1>
      <h2>Connected users:</h2>
      <ul>
        {connectedUsers.map((x) => (
          <li>{x.username}</li>
        ))}
      </ul>
    </div>
  );
};
