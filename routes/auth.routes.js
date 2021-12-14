const authController = require('../controllers/auth.controller')
const Router = require('express')
const { check } = require('express-validator')
const authRouter = new Router()

authRouter.post('/registration', [
  check('fullName', "This field connot be empty")
    .notEmpty(),
  check('dob', "Invalid Date of Birth")
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