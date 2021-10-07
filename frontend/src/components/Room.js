import React, { useEffect, useState, useContext, useCallback } from 'react';
import { BrowserRouter as useParams } from 'react-router-dom';
import { ObjectId } from 'bson';
import { getAllMessagesForRoom } from '../services/messageService';
import { SocketContext } from '../context/socket';
import { getUser } from '../utils/utils';
import './stylesheets/room.css';

function Room({ roomName, handleNotification, roomId }) {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const socket = useContext(SocketContext);

  const handleNewMessages = useCallback(
    (data) => {
      setMessages([...messages, data]);
    },
    [messages]
  );

  const handleMessageDelete = useCallback(
    (data) => {
      setMessages(messages.filter((m) => m._id !== data._id));
    },
    [messages]
  );

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

  useEffect(() => {
    socket.once('message:received', (data) => handleNewMessages(data));
    socket.once('message:removed', (data) => handleMessageDelete(data));
    return () => {
      socket.off('message:received', handleNewMessages);
      socket.off('message:removed', handleMessageDelete);
    };
  }, [socket, messages, handleNewMessages, handleMessageDelete]);

  const emitMessageDel = (x) => {
    socket.emit('message:delete', x);
    setMessages(messages.filter((m) => m._id !== x._id));
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
  // if (socket) {
  //   socket.once('message:received', (data) => {
  //     console.log('msgrec');
  //     setMessages([...messages, data]);
  //   });

  //   socket.once('message:removed', (data) => {
  //     const newMessages = messages.filter((x) => x._id !== data._id);
  //     setMessages(newMessages);
  //   });
  // }

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
