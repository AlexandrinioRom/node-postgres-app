const { tokenChecking } = require('../middleware/user.middleware')
const userController = require('../controllers/user.controller')

const Router = require('express')
const { check } = require('express-validator')
const userRouter = new Router()

userRouter.put('/', [
  check('fullName', "This field cannot be a number and his length should be more then one")
    .notEmpty({ ignore_whitespace: true })
    .isLength({ min: 2 }),
  // check('dob', "Invalid Date of Birth")
  //   .isDate({ delimiters: ['/', '.', '-'] })
  //   .isBefore(String(new Date().getFullYear() - 10))
  //   .isAfter(String(new Date().getFullYear() - 65)),
  check('email', "Invalid email")
    .isEmail()
    .notEmpty()
    .normalizeEmail(),
  // check('password', "Password length must be between 4 and 8 characters")
  //   .isLength({ min: 4, max: 10 }),
], tokenChecking, userController.updateUser)
userRouter.get('/', tokenChecking, userController.getUsers)
userRouter.delete('/', tokenChecking, userController.deleteUser)
userRouter.get('/tokencheck', tokenChecking, userController.check)

module.exports = userRouter