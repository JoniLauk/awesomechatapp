import React, { useEffect, useState, useRef } from 'react';
// import { BrowserRouter as useParams } from 'react-router-dom';
import { ObjectId } from 'bson';
import { getAllMessagesForRoom } from '../services/messageService';
import { getUser } from '../utils/utils';
import './stylesheets/room.css';
import { render } from 'react-dom';
import { FaChevronLeft, FaInfoCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

function Room({ roomName, socket }) {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const messageClassName = 'receivedMessage';
  const history = useHistory();

  /**
   * Async wrapper for getAll function which retrieves messages from
   * the API. Adds messages to messages state.
   */
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

  const getMessages = async () => {
    const response = await getAllMessagesForRoom(roomName);
    setMessages(response);
    scrollToBottom();
  };

  useEffect(() => {
    getMessages();
  }, []);

  const messageItems = messages.map((x) => (
    <li
      className={x.user === getUser() ? 'sentMessage' : 'receivedMessage'}
      onClick={() => console.log(x)}
      key={x._id}
    >
      <div className="fromUser">{x.user === getUser() ? '' : x.user}</div>
      <div>{x.content}</div>
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
      scrollToBottom();
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

  const goBack = () => {
    history.push('/rooms');
  };

  return (
    <div className="viewContainer">
      <div className="topBar">
        <div onClick={goBack}>
          <FaChevronLeft />
        </div>
        <div className="roomName">{roomName}</div>
        <div className="rightIcon">
          <FaInfoCircle />
        </div>
      </div>
      <div className="room">
        <ul className="chat">
          {messageItems}
          <div ref={messagesEndRef} />
        </ul>
        <form className="submitMessageForm" onSubmit={emitMessage}>
          <input onChange={handleMessageContent} value={messageContent}></input>
          <button className="submitMessage" type="submit">
            +
          </button>
        </form>
      </div>
    </div>
  );
}

export default Room;
