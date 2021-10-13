const { check, validationResult } = require('express-validator');

exports.validatePasswords = [
  check('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Invalid password!')
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
    .withMessage(
      'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"'
    )
    .bail(),
  check('newPassword')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Invalid password!')
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
    .withMessage(
      'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"'
    )
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
