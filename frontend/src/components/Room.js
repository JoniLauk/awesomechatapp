import React, { useEffect, useState } from 'react';
import { BrowserRouter as useParams } from 'react-router-dom';
import { getAll } from '../services/messageService';
import './stylesheets/room.css';

function Room({ roomName, socket }) {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');

  /**
   * Async wrapper for getAll function which retrieves messages from
   * the API. Adds messages to messages state.
   */
  const getMessages = async () => {
    const response = await getAll();
    setMessages(response);
  };

  useEffect(() => {
    getMessages();
  }, []);

  const messageItems = messages
    .filter((x) => x.roomName === roomName)
    .map((x) => <li key={x.id}>{x.content}</li>);

  /**
   * Send message to backend which handles saving to the database.
   */
  const emitMessage = (event) => {
    event.preventDefault();
    const newMessage = {
      // TODO
      // Should change this id thing here.
      id: Math.floor(Math.random() * 1000000000),
      roomName: roomName,
      user: 'batman',
      content: messageContent,
    };
    socket.emit('change', newMessage);
    setMessages([...messages, newMessage]);
  };

  /**
   * Listen for broadcast message. When new messages are received add them
   * to messages state.
   */
  if (socket) {
    socket.on('received', (data) => {
      console.log(data);
      setMessages([...messages, data]);
    });
  }

  /**
   * Handles form input. Adds form input target value to messageContent state.
   * @param {event} event
   */
  const handleMessageContent = (event) => {
    event.preventDefault();
    setMessageContent(event.target.value);
  };
  return (
    <div className="room">
      <h2>Tää on huone {roomName}</h2>
      <ul>{messageItems}</ul>
      <form onSubmit={emitMessage}>
        <input onChange={handleMessageContent}></input>
        <button type="submit">Event</button>
      </form>
    </div>
  );
}

export default Room;
