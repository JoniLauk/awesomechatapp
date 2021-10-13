import React, { useState } from 'react';
import { handleNotification } from '../utils/utils';
import { addNewRoom, getAll } from '../services/roomService';
import { Notification } from './Notification';

export const NewRoom = ({
  isNewRoomVisible,
  setNewRoomVisible,
  rooms,
  setRooms,
}) => {
  const [not, setNot] = useState(false);
  const [notContent, setNotContent] = useState('');
  const [newRoomName, setNewRoomName] = useState('');

  const handleRoomName = (event) => {
    event.preventDefault();
    setNewRoomName(event.target.value);
  };

  const handleNewRoom = async (event) => {
    event.preventDefault();
    if (newRoomName !== '') {
      try {
        await addNewRoom({
          newRoomName,
        });
        const newRooms = await getAll();
        setRooms(newRooms);
        setNewRoomVisible(false);
        setNewRoomName('');
        handleNotification(
          {
            message: `Room added successfully.`,
            type: 'success',
          },
          setNot,
          setNotContent
        );
      } catch (error) {
        if (error.response.data.errors) {
          console.log(error);
          handleNotification(
            {
              message: 'Name is required',
              type: 'error',
            },
            setNot,
            setNotContent
          );
        }
      }
    } else {
      handleNotification(
        {
          message: 'Name is required',
          type: 'error',
        },
        setNot,
        setNotContent
      );
    }
  };

  const cancelNewRoom = () => {
    setNewRoomVisible(false);
    setNewRoomName('');
  };

  const conditionalRender = () => {
    if (isNewRoomVisible) {
      return (
        <div className="addNewRoom">
          <form className="newRoomForm" onSubmit={handleNewRoom}>
            <div className="loginFormDiv">
              <input
                id="login-form-username-input"
                type="name"
                name="newRoomName"
                onChange={handleRoomName}
                value={newRoomName}
                placeholder="name"
              />
            </div>
            <input type="submit" value="Confirm" />
          </form>
          <button onClick={cancelNewRoom}>Cancel</button>
          {not ? <Notification message={notContent}></Notification> : ''}
        </div>
      );
    } else {
      return null;
    }
  };

  return conditionalRender();
};
