const secretPassword = String(process.env.SECRET_PASSWORD)
const { validationResult } = require('express-validator')
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')
const moment = require('moment')
const db = require('../models')

const generateAccessToken = (id) => {
  const secret = process.env.SECRET_JWT
  const payload = {
    id
  }
  return jwt.sign(payload, secret, { expiresIn: "10m" })
}

class AuthController {
  async registration(req, res) {
    try {

      const errorFormatter = ({ msg }) => {
        return `${msg}`
      }
      const errors = validationResult(req).formatWith(errorFormatter)
      if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() })
      }
      const {
        password,
        fullName,
        email,
        dob
      } = req.body
      const user = await db.User.findOne({ where: { email: email } })
      if (user) {
        res.status(400).json({ errors: ['This user alredy exist'] })
        console.log('This user alredy exist')
      } else {

        const hashedPassword = String((CryptoJS.AES.encrypt(password, secretPassword)))
        const newUser = await db.User.create({
          fullName: fullName,
          email: email,
          password: hashedPassword,
          dob: moment(dob, 'YYYY-MM-DD')
        })
        console.log(`Created new user with email: ${newUser.email}`)
        const user = await db.User.findOne({ where: { email: email } })
        const token = generateAccessToken(user.id)
        return res.json({ token })
      }

    } catch (e) {
      console.log(e)
      res.status(400).json('Registration error')
    }
  }
  async login(req, res) {
    try {
      const {
        password,
        email
      } = req.body

      const user = await db.User.findOne({ where: { email: email } })
      if (user == null) {
        return res.status(400).json('This user not exist')
      }

      const bytes = CryptoJS.AES.decrypt(user.password, secretPassword)
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8)

      if (decryptedPassword != password) {
        return res.status(400).json(`Invalid password`)
      }

      const token = generateAccessToken(user.id)
      return res.status(200).json({
        token,
        info: {
          id: user.id,
          dob: user.dob,
          email: user.email,
          fullName: user.fullName
        }
      })

    } catch (e) {
      console.log(e)
      res.status(400).json('login error')
    }
  }
}

module.exports = new AuthController()