const { tokenChecking } = require('../middleware/user.middleware')
const userController = require('../controllers/user.controller')

const Router = require('express')
const { check } = require('express-validator')
const userRouter = new Router()

userRouter.put('/',
  check('fullName', "This field cannot be a number and his length should be more then one")
    .notEmpty()
    .isAlpha('en-US', { ignore: '\s' })
    .isLength({ min: 2 }),
  tokenChecking, userController.updateUser)
userRouter.get('/', tokenChecking, userController.getUsers)
userRouter.delete('/', tokenChecking, userController.deleteUser)

module.exports = userRouter