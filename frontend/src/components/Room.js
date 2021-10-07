import React, { useEffect, useState } from 'react';
import { BrowserRouter as useParams } from 'react-router-dom';
import { ObjectId } from 'bson';
import { getAllMessagesForRoom } from '../services/messageService';
import { getUser } from '../utils/utils';
import './stylesheets/room.css';

function Room({ roomName, socket, handleNotification, roomId }) {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');

  /**
   * Async wrapper for getAll function which retrieves messages from
   * the API. Adds messages to messages state.
   */
  useEffect(() => {
    const getMessages = async () => {
      const response = await getAllMessagesForRoom(roomName);
      setMessages(response);
    };
    getMessages();
  }, [roomName]);

  const emitMessageDel = (x) => {
    socket.emit('message:delete', x);
  };

  /**
   * Send message to backend which handles saving to the database.
   */
  const emitMessage = (event) => {
    event.preventDefault();
    if (messageContent !== '') {
      const newMessage = {
        _id: new ObjectId().toString(),
        roomName: roomName,
        room: roomId,
        user: getUser(),
        content: messageContent,
      };

      setMessageContent('');
      socket.emit('message:create', newMessage);
      setMessages([...messages, newMessage]);
    } else {
      handleNotification({
        message: 'Message cannot be empty.',
        type: 'error',
      });
    }
  };

  const messageItems = messages.map((x) => (
    <li
      onClick={() => emitMessageDel(x)}
      key={x._id}
      className={x.user === getUser() ? 'fooo' : 'bar'}
    >
      <div>{x.content}</div>
      <div>{x.user === getUser() ? '' : x.user}</div>
    </li>
  ));

  /**
   * Listen for broadcast message. When new messages are received add them
   * to messages state.
   */
  if (socket) {
    socket.on('message:received', (data) => {
      setMessages([...messages, data]);
    });

    socket.on('message:removed', (data) => {
      const newMessages = messages.filter((x) => x._id !== data._id);
      setMessages(newMessages);
      console.log('msg remove');
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
        <input onChange={handleMessageContent} value={messageContent}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Room;
