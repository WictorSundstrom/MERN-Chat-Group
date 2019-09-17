// Import express validator, To help with validation on back-end
const { check } = require('express-validator');

// Validator for signing up
const validateSignup = [
    check('username')
    .not().isEmpty().withMessage('Username is empty')
    .isAlphanumeric(['sv-SE']).withMessage('No special characters allowed')
    .isLength({ min : 6 }).withMessage('Username has to be at least 6 characters long'),
    check('password')
    .not().isEmpty().withMessage('Password is empty')
    .isAlphanumeric(['sv-SE']).withMessage('No special characters allowed')
    .isLength({ min : 6 }).withMessage('Password has to be at least 6 characters long'),
    check('passwordConfirmation')
    .not().isEmpty().withMessage('Password is empty')
    .isAlphanumeric(['sv-SE']).withMessage('No special characters allowed')
    .isLength({ min : 6 }).withMessage('Password has to be at least 6 characters long')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords does not match');
        }
        else{
            return true;
        }
    })
]

// Validator for log in
const validateLogin = [
    check('username')
    .not().isEmpty().withMessage('Username is empty')
    .isAlphanumeric(['sv-SE']).withMessage('No special characters allowed')
    .isLength({ min : 6 }).withMessage('Username has to be at least 6 characters long'),
    check('password')
    .not().isEmpty().withMessage('Password is empty')
    .isAlphanumeric(['sv-SE']).withMessage('No special characters allowed')
    .isLength({ min : 6 }).withMessage('Password has to be at least 6 characters long'),
]

// Exports for use in server
module.exports = {
    validateSignup: validateSignup,
    validateLogin: validateLogin
}