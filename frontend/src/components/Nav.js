import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaChevronLeft, FaCog, FaInfoCircle, FaTimes } from 'react-icons/fa';

export const Nav = ({ navProps }) => {
  const { showInfo, setShowInfo, roomName } = navProps;
  const history = useHistory();

  const goBack = () => {
    history.push('/rooms');
  };

  const goSettings = () => {
    history.push('/settings');
  };

  const handleInfoButton = () => {
    setShowInfo(!showInfo);
  };

  const handleShowButtons = () => {
    switch (roomName) {
      case 'AWESOMECHATAPP':
        return <FaCog className="button" onClick={goSettings} />;
      case 'SETTINGS':
        return '';
      default:
        if (!showInfo) {
          return <FaInfoCircle className="button" onClick={handleInfoButton} />;
        } else {
          return <FaTimes className="button" onClick={handleInfoButton} />;
        }
    }
  };

  return (
    <div className="header">
      <div className="topBar">
        <FaChevronLeft className="button" onClick={goBack} />
        <div>{roomName}</div>
        <div>{handleShowButtons()}</div>
      </div>
    </div>
  );
};
