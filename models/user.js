const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      timestamps: false
    })

  User.sync()
  return User
}


module.exports = user
