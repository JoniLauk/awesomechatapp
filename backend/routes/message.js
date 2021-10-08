const express = require('express');
const Message = require('../models/message');
const messageRouter = express.Router();

/**
 * Gets all messages.
 * @name messageRouter_get_All
 * @param {string} req Express get request
 * @param {string} res Express get result
 * @example router.get('/',
 */
messageRouter.get('/', async (req, res, next) => {
  try {
    const messages = await Message.find({
      roomName: req.query.roomName,
    }).populate('room', { name: 1 });
    res.status(200).json(messages);
  } catch (err) {
    // TODO err handling
    console.log(err);
  }
});

messageRouter.get('/:id', async (req, res, next) => {
  await Message.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
  const message = await Message.find({ _id: req.params.id });
  res.status(200).json(message);
});

messageRouter.post('/', (req, res, next) => {
  Message.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = messageRouter;
