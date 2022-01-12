const { validationResult } = require('express-validator')
const db = require('../models')
class UserController {

  async getUsers(req, res) {
    try {
      const users = await db.User.findAll()
      if (users.length === 0) {
        return res.status(400).json('Users list is empty')
      }
      res.status(200).json(users)
      console.log(`findUsers was colled`)

    } catch (e) {
      console.log(e)
      res.status(400).json('Get users error')
    }
  }


  async updateUser(req, res) {
    const { fullName, dob } = req.body
    try {

      const user = await db.User.findOne({ where: { id: req.user.id } })

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json('Registration error', errors)
      }
      console.log(dob);

      await user.update(
        {
          dob: dob,
          fullName: fullName,

        },
        {
          where: {
            id: req.user.id
          }
        })

      res.status(200).json({
        id: user.id,
        fullName: user.fullName,
        dob: user.dob,
        email: user.email
      })

      console.log(user.dob);
    } catch (e) {
      console.log(e);
      res.status(400).json('Update user error')
    }
  }


  async deleteUser(req, res) {
    const { email } = req.body
    try {
      const user = await db.User.findOne({ where: { email: email } })
      if (user == null) {
        console.log('This user not exist')
        return res.status(400).json('This user not exist')
      }
      await user.destroy({ where: { email: email } })
      res.status(200).json(`User with email: ${email} was delete`)
      console.log(`User with email: ${email} was delete`)
    } catch (e) {
      console.log(e)
      res.status(400).json('Delete error')
    }
  }

  async check(req, res) {
    try {
      const user = await db.User.findOne({ where: { id: req.user.id } })
      return res.status(200).json({
        id: user.id,
        fullName: user.fullName,
        dob: user.dob,
        email: user.email
      })

    } catch (error) {
      console.log(error);
      res.status(400).json(error)
    }
  }

}

module.exports = new UserController()