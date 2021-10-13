const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const messageRouter = require('./routes/message');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');
const roomRouter = require('./routes/room');
const Message = require('./models/message');
const Room = require('./models/room');
const path = require('path');
const { tokenExtractor, authenticator } = require('./middleware/middleware');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const PORT = 4000;

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

let users = [];

/**
 * Socket listens for incoming events from the client. Data sent between client and server
 * is handled based on the event type.
 * @param {socket} Socket.io socket which connects client to this backend.
 */
io.on('connection', (socket) => {
  // On connection event add user to room which comes from the client side.
  socket.on('room:join', (data) => {
    // console.log(data);
    socket.join(data.roomId.id);
    // If user doesn't exist in users array add him/her.
    const user = users.find((obj) => obj.user === data.username);
    if (!user) {
      users.push({
        username: data.username,
        user: data.user,
        roomName: data.roomName,
        socketId: socket.id,
      });
    }

    console.log(users);

    // Emit users array to all connected clients in specific room.
    io.to(data.roomId.id).emit('connected:users', users);
  });

  // On room leave event remove user from array and emit new array to all other
  // clients.
  socket.on('room:leave', (data) => {
    const user = users.find((obj) => obj.user === data.user);
    users = users.filter((x) => x.username !== user.username);
    socket.leave(data.roomName);
    io.to(data.roomName).emit('connected:users', users);
  });

  // Listen for new message. When event happens, add new message to database and emit it to connected
  // clients.
  socket.on('message:create', (data) => {
    createMessage(socket, data);
    console.log(data.roomName);
    io.to(data.roomName).emit('message:received', data);
  });

  // On delete event, remove specified message.
  socket.on('message:delete', (data) => deleteMessage(socket, data));

  // On client disconnect remove user from array and emit it to the remaining clients.
  socket.on('disconnect', (data) => {
    const user = users.find((obj) => obj.socketId === socket.id);
    if (user) {
      users = users.filter((x) => x.username !== user.username);
      io.to(user.roomName).emit('connected:users', users);
    }
  });
});

/**
 * Creates new message on the database. Also adds message to the specific rooms messages
 * array.
 * @param {socket} socket
 * @param {message} data
 */
const createMessage = async (socket, data) => {
  console.log(data);
  try {
    const newMessage = { ...data, date: new Date() };
    Message.create(newMessage);
    await Room.updateOne({ _id: data.room }, { $push: { messages: data._id } });
  } catch (err) {
    console.log(err);
  }
};

/**
 * Deletes a message from the database. Emits updates to the clients.
 * @param {socket} socket
 * @param {message} data
 */
const deleteMessage = async (socket, data) => {
  try {
    await Message.findByIdAndDelete(data._id);
    socket.broadcast.emit('message:removed', data);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Set up mongoose connection.
 */
mongoose
  .connect(
    process.env.NODE_ENV === 'dev'
      ? process.env.MONGODB_TEST_URI
      : process.env.MONGODB_URI
  )
  .then(() => {
    console.log('connection successful');
  })
  .catch((err) => console.log(err));

app.use('/api/login', loginRouter);
app.use('/api/rooms', [tokenExtractor, authenticator], roomRouter);
app.use('/api/messages', [tokenExtractor, authenticator], messageRouter);
app.use('/api/users', userRouter);

if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

server.listen(process.env.PORT || 5000, () => {
  console.log(`App listening on port ${PORT}`);
});
