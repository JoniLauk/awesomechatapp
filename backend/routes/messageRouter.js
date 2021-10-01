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
  const messages = await Message.find({}).exec();
  res.status(200).json(messages);
});

messageRouter.post('/', (req, res, next) => {
  Message.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = messageRouter;
