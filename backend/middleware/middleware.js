const jwt = require('jsonwebtoken');

/**
 * Extracts JsonWebToken from the request body and adds it to
 * request objects token field.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const tokenExtractor = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7);
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
          error: 'Invalid token',
        });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      error: 'Token missing',
    });
    next();
  }
};

module.exports = { tokenExtractor, authenticator };
