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
  return jwt.sign(payload, secret, { expiresIn: "1m" })
}

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error', errors })
      }
      const {
        password,
        fullName,
        email,
        dob
      } = req.body
      const user = await db.User.findOne({ where: { email: email } })
      if (user) {
        res.status(400).json('This user alredy exist')
      } else {

        const hashedPassword = String((CryptoJS.AES.encrypt(password, secretPassword)))
        const newUser = await db.User.create({
          fullName: fullName,
          email: email,
          password: hashedPassword,
          dob: moment(dob, 'YYYY-MM-DD')
        })
        console.log(`Created new user with email: ${newUser.email}`)
        res.status(200).json({ message: `Created new user with email: ${newUser.email}` })
      }

    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Registration error' })
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
      return res.json({ token })

    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'login error' })
    }
  }
}

module.exports = new AuthController()