import React from 'react';

export const InfoComponent = (props) => {
  const { connectedUsers } = props;
  return <div>{connectedUsers.map((x) => x.username)}</div>;
};
