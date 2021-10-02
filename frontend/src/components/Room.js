import React from 'react';
import { BrowserRouter as useParams } from 'react-router-dom';

function Room({ roomName }) {
  return <h2>Tää on huone {roomName}</h2>;
}

export default Room;
