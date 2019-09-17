// imports NPM
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const envVars = require('dotenv').config()
const socket = require('socket.io');
// imports Home-made
const signup = require('./controllers/auth').signup
const login = require('./controllers/auth').login
const logout = require('./controllers/auth').logout
const isAuthorized = require('./controllers/auth').isAuthorized
const getUsername = require('./controllers/auth').getUsername
// Validators
const validateSignup = require('./validator/validator').validateSignup;
const validateLogin = require('./validator/validator').validateLogin;
// Routes
const userRouter = require('./routes/user')
const friendRouter = require('./routes/friend')
const postRouter = require('./routes/post')

// Declare app to be express
const app = express()
 
// Checking if needed JWT file exists
if (envVars.error) {
    console.log('.env Error')
}
// Adding middleware needed for server
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Connect to mongoose / mongodb
mongoose.connect('mongodb://localhost/testbase1000', {useNewUrlParser: true, useCreateIndex: true})
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))

// Api
// Public
app.post('/signup', validateSignup, signup)
app.post('/login', validateLogin, login)
app.post('/logout', logout)
// "Protected"  
app.use('/api', isAuthorized)
app.use('/api/user', userRouter)
app.use('/api/friends', friendRouter)
app.use('/api/chat', postRouter)


// Server start
server = app.listen(3001, function() {
    console.log(`server started at port 3001!`)
})

// Socket IO
io = socket(server);

io.on('connection', (socket) => {
    socket.on('SEND_MESSAGE', (data) => {
        io.emit('RECEIVE_MESSAGE', data);
    })
});