import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from 'react';
import { BrowserRouter as useParams } from 'react-router-dom';
import { ObjectId } from 'bson';
import { getAllMessagesForRoom } from '../services/messageService';
import { SocketContext } from '../context/socket';
import { getUser } from '../utils/utils';
import './stylesheets/room.css';
import { render } from 'react-dom';
import { FaChevronLeft, FaInfoCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

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

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

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
        room: roomId,
        user: getUser(),
        content: messageContent,
      };

      setMessageContent('');
      socket.emit('message:create', newMessage);
      setMessages([...messages, newMessage]);
      setTimeout(() => {
        scrollToBottom();
      }, 1);
    } else {
      handleNotification({
        message: 'Message cannot be empty.',
        type: 'error',
      });
    }
  };

  /**
   * Handles form input. Adds form input target value to messageContent state.
   * @param {event} event
   */
  const handleMessageContent = (event) => {
    event.preventDefault();
    setMessageContent(event.target.value);
  };

  const goBack = () => {};

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
