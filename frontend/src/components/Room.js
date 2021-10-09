import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from 'react';
import { ObjectId } from 'bson';
import { getAllMessagesForRoom } from '../services/messageService';
import { SocketContext } from '../context/socket';
import { getUserId, getUser } from '../utils/utils';
import './stylesheets/room.css';
import { FaChevronLeft, FaInfoCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { InfoComponent } from './InfoComponent';

/**
 * Room where users can join and send messages to each other. All communications with the server
 * are handled via socket.io. Every CRUD-operation is event which is handled on the backend.
 * @param {*} param0
 * @returns Room component
 */
function Room({ roomName, handleNotification, roomId }) {
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const socket = useContext(SocketContext);
  const history = useHistory();
  const messagesEndRef = useRef(null);

  /**
   * Appends new messages to the messages state array.
   */
  const handleNewMessages = useCallback(
    (data) => {
      setMessages([...messages, data]);
    },
    [messages]
  );

  /**
   * Removes specified message from the messages array.
   */
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
      return () => {
        setMessages([]);
      };
    };

    getMessages();
  }, [roomName]);

  /**
   * Listens for events fired from the server. Calls either handleNewMessage or
   * handleMessageDelete callback functions based on the event received.
   */
  useEffect(() => {
    socket.once('message:received', (data) => handleNewMessages(data));
    socket.once('message:removed', (data) => handleMessageDelete(data));
    return () => {
      socket.off('message:received', handleNewMessages);
      socket.off('message:removed', handleMessageDelete);
    };
  }, [socket, handleNewMessages, handleMessageDelete]);

  const emitMessageDel = (x) => {
    socket.emit('message:delete', x);
    setMessages(messages.filter((m) => m._id !== x._id));
  };

  /**
   * When user joins room, fires 'room:join' event which is handled on the server.
   * On user leaving the room, fires 'room:leave' event. Again handled on the server.
   * Listens for 'connected:users' event. When event happens, adds received array of users
   * to connectedUsers state array.
   */
  useEffect(() => {
    socket.emit('room:join', {
      roomName,
      user: getUserId(),
      username: getUser(),
    });
    socket.on('connected:users', (data) => {
      console.log(data);
      setConnectedUsers(data);
    });
    return () => {
      socket.emit('room:leave', {
        roomName,
        user: getUserId(),
        username: getUser(),
      });
      setConnectedUsers([]);
    };
  }, [socket, roomName]);

  /**
   * When messages array changes, scroll down.
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      // setMessages([...messages, newMessage]);
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

  /**
   * Handles going back a page.
   */
  const goBack = () => {
    history.goBack();
  };

  /**
   * Scrolls to the bottom of the page.
   */
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

  const handleUserArray = () => {
    setShowInfo(!showInfo);
  };

  const messageItems = messages.map((x) => (
    <li
      className={x.user === getUser() ? 'sentMessage' : 'receivedMessage'}
      onClick={() => emitMessageDel(x)}
      key={x._id}
    >
      <div className="fromUser">{x.user === getUser() ? '' : x.user}</div>
      <div>{x.content}</div>
    </li>
  ));

  return (
    <div className="viewContainer">
      <div className="topBar">
        <div onClick={goBack}>
          <FaChevronLeft />
        </div>
        <div className="roomName">{roomName}</div>
        <div className="rightIcon">
          <FaInfoCircle onClick={() => handleUserArray()} />
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
      {showInfo ? <InfoComponent connectedUsers={connectedUsers} /> : ''}
    </div>
  );
}

export default Room;
