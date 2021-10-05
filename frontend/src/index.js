import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


export { default as Home } from './components/Home';
export { default as Settings } from './components/Settings';
export { default as Rooms } from './components/Rooms';
export { default as Room } from './components/Room';
export { default as Login } from './components/Login';
export { default as Signup } from './components/Signup';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
