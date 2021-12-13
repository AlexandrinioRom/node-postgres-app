class AuthController {
  async registration(req, res) {
    try {
      const {
        password,
        fullName,
        email,
        dob
      } = req.body
      console.log(fullName, email, password, dob)
      res.json(`Hello, ${fullName}`)

    } catch (e) {
      console.log(e);
      res.staus(400).json({ message: 'Registration error' })
    }
  }
  async login(req, res) {
    try {
      const {
        password,
        email
      } = req.body
      console.log(email, password)
      res.json(`Email: ${email}`)
    } catch (e) {
      console.log(e);
      res.staus(400).json({ message: 'login error' })
    }
  }
}

module.exports = new AuthController()