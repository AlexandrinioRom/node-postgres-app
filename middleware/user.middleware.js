const jwt = require('jsonwebtoken')
module.exports.tokenChecking = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
      return res.status(404).send('Token is out')
    }

    jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
      if (err) return res.status(404).send('Token is not valid')
      req.user = user
      next()
    })
  } catch (e) {
    console.log(e)
    return res.status(403).send('Token is not valid')
  }

};