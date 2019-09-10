const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { check } = require('express-validator')
const signup = require('./controllers/auth').signup
const login = require('./controllers/auth').login
const isAuthorized = require('./controllers/auth').isAuthorized
const envVars = require('dotenv').config()

const server = express()


if (envVars.error) {
    console.log('.env Error')
  }

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost/testbase1000', {useNewUrlParser: true, useCreateIndex: true})
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))

//server.get('/', function(req, res) {
//    res.json({aProperty : 'Some Value'})
//})

server.post('/signup', [
    check('username').isLength({ min: 5 }),
    check('password').isLength({ min: 6 })
], signup)
server.post('/login', login)
server.use('/chat', isAuthorized)


server.listen(3001, function() {
    console.log(`server started at port 3001!`)
})