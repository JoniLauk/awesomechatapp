import React, { useEffect, useState } from 'react';
// import { BrowserRouter as useParams } from 'react-router-dom';
import { ObjectId } from 'bson';
import { getAllMessagesForRoom } from '../services/messageService';
import { getUser } from '../utils/utils';

function Room({ roomName, socket }) {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');

  /**
   * Async wrapper for getAll function which retrieves messages from
   * the API. Adds messages to messages state.
   */
  const getMessages = async () => {
    const response = await getAllMessagesForRoom(roomName);
    setMessages(response);
  };

  useEffect(() => {
    getMessages();
  }, []);

  const messageItems = messages.map((x) => (
    <li onClick={() => console.log(x)} key={x._id}>
      {x.content}
    </li>
  ));

  /**
   * Send message to backend which handles saving to the database.
   */
  const emitMessage = (event) => {
    event.preventDefault();
    if (messageContent !== '') {
      const newMessage = {
        _id: new ObjectId().toString(),
        roomName: roomName,
        user: getUser(),
        content: messageContent,
      };

      setMessageContent('');
      socket.emit('change', newMessage);
      setMessages([...messages, newMessage]);
    }
  };

  /**
   * Listen for broadcast message. When new messages are received add them
   * to messages state.
   */
  if (socket) {
    socket.on('received', (data) => {
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
    <div>
      <h2>Tää on huone {roomName}</h2>
      <ul>{messageItems}</ul>
      <form onSubmit={emitMessage}>
        <input onChange={handleMessageContent} value={messageContent}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Room;
