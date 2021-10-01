const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const messageRouter = require('./routes/messageRouter');
const userRouter = require('./routes/messageRouter');

const app = express();
const PORT = 4000;

/**
 * Set up mongoose connection.
 */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connection successful');
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use('/api/messages', messageRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
