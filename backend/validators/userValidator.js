const { check, validationResult } = require('express-validator');

exports.validateUser = [
  check('username')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .matches(/[A-Za-z1-9]{2,}/)
    .withMessage(
      'Username must contain atleast two characters. No special characters!'
    )
    .bail(),
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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
