const Sequelize = require('sequelize')
const sequelize = new Sequelize('workoutLogProject', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
})

sequelize.authenticate().then(
  function () {
    console.log('Connected to workoutLogProject postgres database')
  },
  function (err) {
    console.log(err)
  }
)

module.exports = sequelize
