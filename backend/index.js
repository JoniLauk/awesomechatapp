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
const { tokenExtractor, authenticator } = require('./middleware/middleware');
const { token } = require('morgan');
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

/**
 * Socket listens for incoming events from the client. Data sent between client and server
 * is handled based on the event type.
 * @param {socket} Socket.io socket which connects client to this backend.
 */
io.on('connection', (socket) => {
  socket.on('message:create', (data) => createMessage(socket, data));
  socket.on('message:delete', (data) => deleteMessage(socket, data));
  socket.on('user:connect', (data) => userConnected(socket, data));
});

/**
 * Creates new message on the database. Also adds message to the specific rooms messages
 * array.
 * @param {socket} socket
 * @param {message} data
 */
const createMessage = async (socket, data) => {
  try {
    const newMessage = { ...data, date: new Date() };
    Message.create(newMessage);
    await Room.updateOne({ _id: data.room }, { $push: { messages: data._id } });
    socket.broadcast.emit('message:received', data);
  } catch (err) {
    console.log(err);
  }
};

const deleteMessage = async (socket, data) => {
  try {
    await Message.findByIdAndDelete(data._id);
    socket.broadcast.emit('message:removed', data);
  } catch (err) {
    console.log(err);
  }
};

const userConnected = (socket, data) => {
  console.log(data);
  // socket.broadcast.emit('user:connect:broadcast', data);
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

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
