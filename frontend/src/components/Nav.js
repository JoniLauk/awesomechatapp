import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaChevronLeft, FaCog } from 'react-icons/fa';

export const Nav = ({ roomName }) => {
  const history = useHistory();

  const goBack = () => {
    history.push('/rooms');
  };

  const goSettings = () => {
    history.push('/settings');
  };
  return (
    <div>
      <div className="topBar">
        <FaChevronLeft onClick={goBack} />
        <div>{roomName}</div>
        <div>
          <FaCog onClick={goSettings} />
        </div>
      </div>
    </div>
  );
};
