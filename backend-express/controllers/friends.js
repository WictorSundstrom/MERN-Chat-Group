const User = require('../models/user.model')

const loadFriends = async (req, res) => {

    console.log(res)

    User.find({}).then(function(users) {
        console.log(users)
        return res.status(201).json(users)
    })
}   

const updateFriends = async (req, res) => {

    
    return res.status(201).send({ signedJWT })

}   

module.exports = {
    loadFriends: loadFriends,
    updateFriends: updateFriends
}