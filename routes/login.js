const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const loginRouter = require('express').Router();

/**
 * Gets user information given by user and compares it to information from database.
 * @name loginRouter_post
 * @param {string} req Express request
 * @param {string} res Express result
 * @example loginRouter.post('/',
 */
loginRouter.post('/', async (req, res) => {
  const { body } = req;

  const user = await User.findOne({ username: body.username });

  console.log(user);

  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(400).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({
    token,
    username: user.username,
    id: user.id,
  });
});

module.exports = loginRouter;
