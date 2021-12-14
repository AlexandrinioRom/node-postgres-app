class UserController {
  async createUser(req, res) {

  }
  async getUser(req, res) {
    res.json({ name: 'sasha', age: 24 }).status(200)

  }
  async updateUser(req, res) {

  }
  async deleteUser(req, res) {

  }

}

module.exports = new UserController()