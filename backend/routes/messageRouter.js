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
  Message.find({}, (err, message) => {
    res.status(200).json(message);
  });
});

messageRouter.post('/', async (req, res) => {
  await Message.create(req.body, (err, post) => {
    res.json(post);
  });
});

module.exports = messageRouter;
