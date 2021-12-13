const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.user

const generateAccessToken = (id) => {
  const payload = {
    id
  }
  return jwt.sign(payload, 'secret key 123', { expiresIn: "24h" })
}

class AuthController {
  async registration(req, res) {
    try {
      const {
        password,
        fullName,
        email,
        dob
      } = req.body
      const user = await User.findOne({ where: { email: email } })
      if (user) {
        res.status(400).json('This user alredy exist')
      } else {
        const hashedPassword = String((CryptoJS.AES.encrypt(password, 'secret key 123')))
        const newUser = await User.create({
          fullName: fullName,
          email: email,
          password: hashedPassword,
          dob: dob
        })
        console.log(`Created new user with email: ${newUser.email}`)
        res.json(`Hello, ${fullName}`)
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

      const user = await User.findOne({ where: { email: email } })
      if (!user) {
        return res.status(400).json('This user not exist')
      }

      const bytes = CryptoJS.AES.decrypt(user.password, 'secret key 123')
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8)

      if (decryptedPassword != password) {
        return res.status(400).json(`Invalid password`)
      }
      const token = generateAccessToken(user._id)
      return res.json({ token })

    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'login error' })
    }
  }
}

module.exports = new AuthController()