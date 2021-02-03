require('dotenv').config()
let express = require('express')
let app = express()
let sequelize = require('./db')
let log = require('./controllers/logcontroller')
let user = require('./controllers/usercontroller')

sequelize.sync()
// sequelize.sync({ force: true })
app.use(require('./middleware/headers'))
app.use(express.json())

// app.use(require('./middleware/validate-session'))
app.use('/log', log)
app.use('/user', user)

app.listen(3000, function () {
  console.log('App is listening on port 3000')
})
