const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { check, body } = require('express-validator')
const envVars = require('dotenv').config()
const signup = require('./controllers/auth').signup
const login = require('./controllers/auth').login
const logout = require('./controllers/auth').logout
const isAuthorized = require('./controllers/auth').isAuthorized
const loadFriends = require('./controllers/auth').loadFriends
const updateFriends = require('./controllers/auth').updateFriends

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

server.post('/signup',  [
    check('username')
    .not().isEmpty().withMessage('Username is empty')
    .isAlphanumeric(['sv-SE']).withMessage('No special characters allowed')
    .isLength({ min : 6 }).withMessage('Username has to be at least 6 characters long'),
    check('password')
    .not().isEmpty().withMessage('Password is empty')
    .isAlphanumeric(['sv-SE']).withMessage('No special characters allowed')
    .isLength({ min : 6 }).withMessage('Password has to be at least 6 characters long'),
    check('passwordConfirmation')
    .not().isEmpty().withMessage('Password is empty')
    .isAlphanumeric(['sv-SE']).withMessage('No special characters allowed')
    .isLength({ min : 6 }).withMessage('Password has to be at least 6 characters long')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords does not match');
        }
        else{
            return true;
        }
    })
],
 signup)

server.post('/login', [
    check('username')
    .not().isEmpty().withMessage('Username is empty')
    .isAlphanumeric(['sv-SE']).withMessage('No special characters allowed')
    .isLength({ min : 6 }).withMessage('Username has to be at least 6 characters long'),
    check('password')
    .not().isEmpty().withMessage('Password is empty')
    .isAlphanumeric(['sv-SE']).withMessage('No special characters allowed')
    .isLength({ min : 6 }).withMessage('Password has to be at least 6 characters long'),
], login)

server.post('/logout', logout)

server.use('/chat', isAuthorized)

server.get('/friends', loadFriends)
server.post('/friends', updateFriends)
  
server.listen(3001, function() {
    console.log(`server started at port 3001!`)
})