const authController = require('../controllers/auth.controller')
const Router = require('express')

const authRouter = new Router()

authRouter.post('/registration.html', authController.registration)
authRouter.post('/login.html', authController.login)

module.exports = authRouter