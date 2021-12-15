const authController = require('../controllers/auth.controller')
const Router = require('express')
const { check } = require('express-validator')

const authRouter = new Router()

authRouter.post('/registration', [
  check('fullName', "This field cannot be a number and his length should be more then one")
    .notEmpty()
    .isAlpha(('en-US', 'ru-RU'), { ignore: '\s' })
    .isLength({ min: 2 }),
  check('dob', "Invalid Date of Birth")
    .isDate({ format: 'DD.MM.YYYY', delimiters: ['/', '.'] })
    .isBefore(String(new Date().getFullYear() - 10))
    .isAfter(String(new Date().getFullYear() - 65)),
  check('email', "Invalid email")
    .isEmail()
    .notEmpty()
    .normalizeEmail(),
  check('password', "Password length must be between 4 and 8 characters")
    .isLength({ min: 4, max: 10 }),
], authController.registration)
authRouter.post('/login', authController.login)

module.exports = authRouter