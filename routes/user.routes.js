const userController = require('../controllers/user.controller')
const Router = require('express')

const userRouter = new Router()

userRouter.post('/', userController.createUser)
userRouter.get('/', userController.getUser)
userRouter.put('/', userController.updateUser)
userRouter.delete('/', userController.deleteUser)

module.exports = userRouter