//require packages
// const passport = require('passport')
const express = require('express')
const rowdy = require('rowdy-logger')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
require('./models')

//config express app
const app = express()
const PORT = process.env.PORT || 3001
const rowdyResults = rowdy.begin(app)

//middleware
app.use(morgan('tiny'))
app.use(cors())
// request body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) 
// app.use(passport.initialize())


const middleware = (req, res, next) => {
    console.log('hello from middleware')
    next()
}

//test index route
app.get('/', middleware, (req, res) => {
    res.json({msg: 'hello world ❤️'})
})

//controllers
// app.use('/auth', require('./controllers/authController'))
app.use('/users', require('./controllers/UserController'))
app.use('/users', require('./controllers/AppointmentsController'))


//tell express to listen for PORT
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`u are listening for PORT ${PORT} 🌸`);
})