const jwt = require('jsonwebtoken');

const tokenExtractor = (req, res, next) => {
  const auth = req.body('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

const authenticator = (req, res, next) => {
  if (req.token) {
    jwt.verify(req.token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({
          error: 'Token missing',
        });
      }
    });
    req.user = user;
    next();
  } else {
    next();
  }
};

module.exports = { tokenExtractor, authenticator };
