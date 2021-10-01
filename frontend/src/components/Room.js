import React from "react";
import { BrowserRouter as useParams } from "react-router-dom";

function Room(props) {
  let { roomId } = useParams();
  return <h3>Requested room ID: {roomId}</h3>;
}

export default Room;
