const db = require('../models')
const jwt = require('jsonwebtoken')
module.exports.tokenChecking = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    jwt.verify(token, process.env.SECRET_JWT, async (err, user) => {
      if (err) return res.status(404).json(err.message)
      const userChek = await db.User.findOne({ where: { id: user.id } })
      if (userChek == null) {
        return res.status(400).json('The user with your id does not exist in the database')
      }
      req.user = user
      next()
    })

  } catch (e) {
    console.log(e)
    return res.status(403).send('Token is not valid')
  }
};