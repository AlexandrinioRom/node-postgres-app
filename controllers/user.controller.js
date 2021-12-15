const { validationResult } = require('express-validator')
const db = require('../models')
class UserController {

  async getUsers(req, res) {
    try {
      const users = await db.User.findAll()
      res.status(200).json(users)
      console.log(`findUsers was colled`)
      if (users.length === 0) {
        return res.status(400).json({ message: 'Users list is empty' })
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Get users error' })
    }
  }
  async updateUser(req, res) {
    const { email, fullName, dob } = req.body
    try {
      const user = await db.User.findOne({ where: { email: email } })
      if (user == null) {
        return res.status(400).json({ message: 'This user not exist' })
      }
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error', errors })
      }
      const oldName = user.fullName
      await user.update(
        {
          fullName: fullName,
        },
        {
          where: {
            email: email
          }
        })
      if (oldName == fullName) {

        return res.status(200).json({ message: 'You must change the params for update the user' })
      }
      res.status(200).json({ message: `${user.email} was update` })

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Update user error' })
    }
  }
  async deleteUser(req, res) {
    const { email } = req.body
    try {
      const user = await db.User.findOne({ where: { email: email } })
      if (user == null) {
        console.log('This user not exist')
        return res.status(400).json({ message: 'This user not exist' })
      }
      await user.destroy({ where: { email: email } })
      res.status(200).json({ message: `User with email: ${email} was delete` })
      console.log(`User with email: ${email} was delete`)
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Delete error' })
    }
  }
}

module.exports = new UserController()