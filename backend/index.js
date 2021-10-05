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
 * Main magic happens here. Connect client socket to backend and listen for
 * 'change' event. On change broadcast the event to another clients and add
 * message to the database.
 * @param {socket} Socket.io socket which connects client to this backend.
 */
io.on('connection', (socket) => {
  socket.on('change', (data) => {
    console.log(data);
    socket.broadcast.emit('received', data);
    // User needs to be changed
    Message.create(data, (err, result) => {
      if (err) console.log(err);
      console.log(result);
    });
  });
});

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
// app.use(tokenExtractor);
// app.use(authenticator);
app.use('/api/messages', messageRouter);
app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
