const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

function createJWT(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_DEV_ENV_SECRET, {
        expiresIn: process.env.JWT_DEV_ENV_EXP
    })
}

const verifyJWT = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_DEV_ENV_SECRET, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
})

const checkUsername = async (token, res) => {
    try {
        payload = await verifyJWT(token)
    } catch (e) {
        
        console.log('JWT error')
        return res.status(500).end()
    }
    return payload
}


const signup = async (req, res) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {
        console.log('Error found!')

        return res.status(422).json({ errors: error.array() });
    }
    const userCheck = await User.findOne({ username: req.body.username }).exec()
    if (userCheck !== null) {
        return res.status(400).json({ errors: [{ 
            param : 'userpass',
            msg : ['Username is already in use']
            }]
        })
    }

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

const login = async (req, res) => {

    const error = validationResult(req);

    if (!error.isEmpty()) {
        console.log(error)
        return res.status(422).json({ errors: error.array() });
    }

    const user = await User.findOne({ username: req.body.username }).exec()
    if (user === null) {
        return res.status(400).json( { errors: [{ 
            param : 'userpass',
            msg : ['Username or password is incorrect']
        }]
     })
    }
    const matchingPasswords = await user.checkPassword(req.body.password)
    if (!matchingPasswords) {
        return res.status(400).json( { errors: [{ 
            param : 'userpass',
            msg : ['Username or password is incorrect']
        }]
     })
    }

    const signedJWT = createJWT(user)
    User.updateOne({'username': req.body.username}, {$set: {'status':'Online'}}).exec()
    return res.status(201).send({ signedJWT })

}     

const logout = async (req, res) => {

    payload = await checkUsername(req.body.token)
    
    const user = await User.findById(payload.id).exec()
    if (!user) {
        console.log('user error')
        return res.status(500).end()
    }

    User.updateOne({'_id': user}, {$set: {'status': 'Offline'}}).exec()
    return res.status(201).send()
}

const isAuthorized = async (req, res, next) => {

    const bearer = req.headers.authorization
    
    const token = bearer.split('Bearer ')[1].trim()

    let payload

    try {
        payload = await verifyJWT(token)
    } catch (e) {
        return res.status(500).end()
    }

    const user = await User.findById(payload.id).exec()

    if (!user) {
        return res.status(500).end()
    }

    req.user = user
    next()
}

const isAdmin = async (req, res, next) => {
    if (req.user) {
        if(req.user.rights === "admin") {
            console.log("admin!")
            next()
        }
        else {
            console.log("member!")
            res.redirect("/");
        }
    }
}

module.exports = {
    signup: signup,
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
}