import React from 'react';
import io from 'socket.io-client';

export const socket = io.connect('localhost:4000');
export const SocketContext = React.createContext();
