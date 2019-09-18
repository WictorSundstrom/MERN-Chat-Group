// Import user as we create and make token from him
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

// Create a jwt
function createJWT(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_DEV_ENV_SECRET, {
        expiresIn: process.env.JWT_DEV_ENV_EXP
    })
}

// Verify that the jwt is a valid one
const verifyJWT = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_DEV_ENV_SECRET, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
})

// Check if the jwt matches a user
const checkUsername = async (token, res) => {
    try {
        payload = await verifyJWT(token)
    } catch (e) {
        
        console.log('JWT error')
        return res.status(500).end()
    }
    return payload
}

// Sign up to the site
const signup = async (req, res) => {
    // logs errors from validation
    const error = validationResult(req);
    // if it finds an error, send one to the front-page
    if (!error.isEmpty()) {
        console.log('Error found!')
        return res.status(422).json({ errors: error.array() });
    }
    //Checks if it can find a user in the database and sends error if it exists
    const userCheck = await User.findOne({ username: req.body.username }).exec()
    if (userCheck !== null) {
        return res.status(400).json({ errors: [{ 
            param : 'userpass',
            msg : ['Username is already in use']
            }]
        })
    }
    // If it managed to get this far it will create a new User with the params specified
    const user = new User()
    user.username = req.body.username
    user.password = req.body.password
    user.passwordConfirmation = req.body.passwordConfirmation
    user.rights = "Member"
    user.status = "Offline"
    user.save(function (err, user) {
        if (err) {
            console.log(err)
            return res.status(500).end()
        } else {
            console.log("Användare skapad!")
            const signedJWT = createJWT(user)
            return res.status(201).send({ signedJWT })
        }
    })
}
// Login to the site
const login = async (req, res) => {
    // logs errors from validation
    const error = validationResult(req);
    // if it finds an error, send one to the front-page
    if (!error.isEmpty()) {
        console.log(error)
        return res.status(422).json({ errors: error.array() });
    }
    
    // Checks if it can find a user in the database and if it does it will move on
    const user = await User.findOne({ username: req.body.username }).exec()
    // If it doesn't find a user it will send an error to front-end
    if (user === null) {
        return res.status(400).json( { errors: [{ 
            param : 'userpass',
            msg : ['Username or password is incorrect']
        }]
     })
    }
    // Checks the password entered is the same as the password saved for the user
    const matchingPasswords = await user.checkPassword(req.body.password)
    // If it's wrong, it will send an error
    if (!matchingPasswords) {
        return res.status(400).json( { errors: [{ 
            param : 'userpass',
            msg : ['Username or password is incorrect']
        }]
     })
    }
    // Create a jwt for the User
    const signedJWT = createJWT(user)
    // If the person got this far he will be changed to Online
    User.updateOne({'username': req.body.username}, {$set: {'status':'Online'}}).exec()
    // Return an OK status and the JWT
    return res.status(201).send({ signedJWT })

}     
// Log out
const logout = async (req, res) => {
    // Checks for the username by JWT token
    payload = await checkUsername(req.body.token)
    // Looks for the id
    const user = await User.findById(payload.id).exec()
    // If it doesn't find it, it will send an error to front-end
    if (!user) {
        console.log('user error')
        return res.status(500).end()
    }
    // Updates a user to Offline
    User.updateOne({'_id': user}, {$set: {'status': 'Offline'}}).exec()
    return res.status(201).send()
}

// Verifierar om du får vara inne på sidan
const isAuthorized = async (req, res, next) => {
    // Kollar om värdet som skickas in i headers: authorization är en token som stämmer
    const bearer = req.headers.authorization
    
    const token = bearer.split('Bearer ')[1].trim()

    let payload
    // Verifierar token och kollar om det är en giltig JWT
    try {
        payload = await verifyJWT(token)
    } catch (e) {
        return res.status(500).end()
    }
    // Kontrollerar om det finns en användare med det användarnamn den fick ut av JWT
    const user = await User.findById(payload.id).exec()

    if (!user) {
        return res.status(500).end()
    }
    // Gör att req.user är användaren, så man kan återanvända detta i andra delar om man har kommit förbi authorization
    req.user = user
    next()

    // !!!!! ATT FIXA !!!!!
    // Kontrollera att användaren inte är inloggad redan-
}

module.exports = {
    signup: signup,
    login: login,
    logout: logout,
    isAuthorized: isAuthorized
}