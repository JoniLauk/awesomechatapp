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
import { FaChevronLeft, FaInfoCircle, FaPlus } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

function Room({ roomName, handleNotification, roomId }) {
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const socket = useContext(SocketContext);
  const history = useHistory();

  useEffect(() => {
    socket.emit('room:join', { roomName, user: getUserId() });
    return () => {
      socket.emit('room:leave', { roomName, user: getUserId() });
    };
  }, [socket, roomName]);

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
      return () => {
        setMessages([]);
      };
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
  }, [socket, handleNewMessages, handleMessageDelete]);

  useEffect(() => {
    socket.emit(
      'user:connect',
      JSON.parse(window.localStorage.getItem('token')).username
    );
  }, [socket]);

  useEffect(() => {
    socket.once('user:connect:broadcast', (data) => {
      console.log(data);
    });
    return () => {
      socket.off('user:connect:broadcast', (data) => {
        console.log('disconnect');
      });
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const emitMessageDel = (x) => {
    socket.emit('message:delete', x);
    setMessages(messages.filter((m) => m._id !== x._id));
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

  const goBack = () => {
    history.goBack();
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
            <FaPlus />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Room;
