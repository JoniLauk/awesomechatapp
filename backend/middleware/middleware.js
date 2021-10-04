const jwt = require('jsonwebtoken');

/**
 * Extracts JsonWebToken from the request body and adds it to
 * request objects token field.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const tokenExtractor = (req, res, next) => {
  const auth = req.body('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

/**
 * Verifies extracted token with the secret stored on the server.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const authenticator = (req, res, next) => {
  if (req.token) {
    jwt.verify(req.token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({
          error: 'Token missing',
        });
      }
      req.user = user;
    });
    next();
  } else {
    next();
  }
};

module.exports = { tokenExtractor, authenticator };
