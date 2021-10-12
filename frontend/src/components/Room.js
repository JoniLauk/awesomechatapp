import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from 'react';
import { ObjectId } from 'bson';
import { getAllMessagesForRoom } from '../services/messageService';
import { getRoomName } from '../services/roomService';
import { SocketContext } from '../context/socket';
import { getUserId, getUser, handleNotification } from '../utils/utils';
import './stylesheets/room.css';
import {
  FaChevronLeft,
  FaInfoCircle,
  FaPlus,
  FaTrashAlt,
} from 'react-icons/fa';
import { useHistory, useRouteMatch, useParams } from 'react-router-dom';
import { InfoComponent } from './InfoComponent';
import { Notification } from './Notification';
import { Nav } from './Nav';

/**
 * Room where users can join and send messages to each other. All communications with the server
 * are handled via socket.io. Every CRUD-operation is event which is handled on the backend.
 * @param {*} param0
 * @returns Room component
 */
function Room({ roomProps }) {
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [not, setNot] = useState(false);
  const [notContent, setNotContent] = useState('');
  const socket = useContext(SocketContext);
  const history = useHistory();
  const messagesEndRef = useRef(null);

  const { setRoomName, setShowInfo, showInfo } = roomProps;

  const roomId = useParams();

  /**
   * Appends new messages to the messages state array.
   */
  const handleNewMessages = useCallback(
    (data) => {
      console.log('hnm');
      setMessages([...messages, data]);
      socket.off('message:received');
    },
    [messages, socket]
  );

  /**
   * Removes specified message from the messages array.
   */
  const handleMessageDelete = useCallback(
    (data) => {
      setMessages(messages.filter((m) => m._id !== data._id));
      socket.off('message:removed');
    },
    [messages, socket]
  );

  /**
   * Async wrapper for getAll function which retrieves messages from
   * the API. Adds messages to messages state.
   */
  useEffect(() => {
    const getMessages = async () => {
      const response = await getAllMessagesForRoom(roomId.id);
      const roomName = await getRoomName(roomId.id);
      setRoomName(roomName.name);
      setMessages(response);
      return () => {
        setMessages([]);
      };
    };

    getMessages();
  }, [roomId, setRoomName]);

  /**
   * Listens for events fired from the server. Calls either handleNewMessage or
   * handleMessageDelete callback functions based on the event received.
   */
  useEffect(() => {
    socket.off('message:received');
    socket.off('message:removed');
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
      roomId,
      user: getUserId(),
      username: getUser(),
    });
    socket.on('connected:users', (data) => {
      setConnectedUsers(data);
    });
    return () => {
      socket.emit('room:leave', {
        roomId,
        user: getUserId(),
        username: getUser(),
      });
      setConnectedUsers([]);
    };
  }, [socket, roomId]);

  /**
   * When messages array changes, scroll down.
   */
  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 25);
  }, [messages]);

  /**
   * Send message to backend which handles saving to the database.
   */
  const emitMessage = (event) => {
    event.preventDefault();
    if (messageContent !== '') {
      const newMessage = {
        _id: new ObjectId().toString(),
        roomName: roomId.id,
        room: roomId.id,
        user: getUser(),
        content: messageContent,
      };

      setMessageContent('');
      socket.emit('message:create', newMessage);
      setTimeout(() => {
        scrollToBottom();
      }, 10);
    } else {
      handleNotification(
        {
          message: 'Message cannot be empty.',
          type: 'error',
        },
        setNot,
        setNotContent
      );
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

  // const handleUserArray = () => {
  //   setShowInfo(!showInfo);
  // };

  // function checkURL(url) {
  //   if (typeof url !== 'string') return false;
  //   return url.match(/\.(jpg|jpeg|gif|png)$/) != null;
  // }

  const checkIfImageExists = (message) => {
    const img = new Image();
    img.src = message.content;
    if (img.complete) {
      return (
        <img
          style={{ maxWdith: '100%' }}
          src={message.content}
          alt={message.content}
        />
      );
    }
    return <p className="messageContent">{message.content}</p>;
  };

  const messageItems = messages.map((x) => {
    return (
      <li
        className={x.user === getUser() ? 'sentMessage' : 'receivedMessage'}
        key={x._id}
      >
        <div
          className="messageMenu"
          onClick={() => {
            emitMessageDel(x);
          }}
        >
          <FaTrashAlt />
        </div>
        <div className="fromUser">
          {x.user === getUser() ? '' : <p className="userName">{x.user}</p>}
          {checkIfImageExists(x)}
        </div>
      </li>
    );
  });
  return (
    <div className="roomViewContainer">
      <div className="room">
        <ul className="chat">
          {messageItems}
          <div ref={messagesEndRef} />
        </ul>
        <form className="submitMessageForm" onSubmit={emitMessage}>
          <input onChange={handleMessageContent} value={messageContent}></input>
          <button className="submitMessage" type="submit">
            <FaPlus />
          </button>
        </form>
      </div>
      {showInfo ? (
        <InfoComponent
          roomName={roomId}
          connectedUsers={connectedUsers}
          setShowInfo={setShowInfo}
        />
      ) : (
        ''
      )}
      {not ? <Notification message={notContent}></Notification> : ''}
    </div>
  );
}

export default Room;
