import React from 'react';
import io from 'socket.io-client';

export const socket = io.connect(
  'https://awesomechatappbeta.herokuapp.com/login'
);
export const SocketContext = React.createContext();
