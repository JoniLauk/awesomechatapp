const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersRouter = require('express').Router();
const User = require('../models/user');
// const bodyParser = require('body-parser');
// const mongoSanitize = require('express-mongo-sanitize');
const { validateUser } = require('../validators/userValidator');
const { validatePasswords } = require('../validators/pwchangeValidator');
const { response } = require('express');
// usersRouter.use(bodyParser.urlencoded({ extended: true }));
// usersRouter.use(bodyParser.json());
// usersRouter.use(mongoSanitize());

/**
 * Gets all users.
 * @name usersRouter_get_All
 * @param {string} req Express get request
 * @param {string} res Express get result
 * @example usersRouter.get('/',
 */
usersRouter.get('/', async (req, res) => {
  // Todennäköisesti ei ole järkevää päästää käyttäjää hakemaan kaikkien muiden
  // käyttäjien käyttäjänimet x)
  try {
    const users = await User.find({}).populate('room', { users: 0 });
    res.json(users);
  } catch (err) {
    // TODO err handling
    console.log(err);
  }
});

/**
 * Gets one user by given id.
 * @name usersRouter_get_One
 * @param {string} req Express get request
 * @param {string} res Express get result
 * @example usersRouter.get('/:id',
 */
usersRouter.get('/:id', async (req, res) => {
  try {
    const returned = await User.findById(req.params.id);
    res.json(returned.toJSON());
  } catch (exception) {
    response.sendStatus(404);
  }
});

/**
 * Add new user to database based on data from express post method.
 * @name usersRouter_post_One
 * @param {string} req Express post request
 * @param {string} res Express post result
 * @param {express-validator} validateUser Custom express validator for username and password
 * @example usersRouter.post('/',
 */
usersRouter.post('/', validateUser, async (req, res) => {
  const { body } = req;

  const usernameLowerCase = JSON.stringify(body.username).toLowerCase();
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: JSON.parse(usernameLowerCase),
    passwordHash,
  });

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  try {
    User.create(user, (err, post) => {
      if (err) {
        res.status(400).json({
          error: 'Username already in use.',
        });
      } else {
        const user = {
          username: post.username,
          token,
          id: post._id,
        };
        res.status(200).json(user);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

/**
 * Updates user based on data from express put method.
 * @name usersRouter_put_Onev
 * @param {string} req Express put request
 * @param {string} res Express put result
 * @example usersRouter.put('/:id',
 */
usersRouter.put('/', validatePasswords, async (req, res) => {
  // Todo err handling
  const { body } = req;
  console.log(body);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.newPassword, saltRounds);

  try {
    const returned = await User.findOneAndUpdate(
      { username: body.user },
      { passwordHash: passwordHash },
      {
        new: true,
      }
    );
    res.json(returned.toJSON());
  } catch (err) {
    res.sendStatus(404);
    console.log(err);
  }
});

/**
 * Deletes user based on data from express delete method.
 * @name usersRouter_delete_One
 * @param {string} req Express delete request
 * @param {string} res Express delete result
 * @example usersRouter.delete('/:id',
 */
usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.status(204).end();
});

module.exports = usersRouter;
