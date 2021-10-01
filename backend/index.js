const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const messageRouter = require('./routes/messageRouter');
const userRouter = require('./routes/messageRouter');

const app = express();
const PORT = 4000;

app.use(morgan('tiny'));
app.use(express.json());

/**
 * Set up mongoose connection.
 */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connection successful');
  })
  .catch((err) => console.log(err));

app.use('/api/messages', messageRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
