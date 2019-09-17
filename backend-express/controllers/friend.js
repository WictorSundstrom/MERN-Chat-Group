const User = require('../models/user.model')

const getAllUsers = async (req, res) => {

    User.find({}).then(function(users) {
        let jsonData = [{ users: users }]
        return res.status(201).json(jsonData)
    })
}   

const addFriend = async (req, res) => {
    try {
        let promise1 = User.findOneAndUpdate(
          { "_id": req.user },
          { "$push": { "friends": req.body.friend } }
        );
    
        let promise2 = User.findOneAndUpdate(
          { "_id": req.body.friend },
          { "$push": { "friends": req.body.user } }
        );
    
        await Promise.all([promise1, promise2,])

    } catch(err) {
        console.log(err)
    }

    return res.status(201).send()
}

const removeFriend = async (req, res) => {

    try {
        let promise1 = User.findOneAndUpdate(
          { "_id": req.user },
          { "$pull": { "friends": req.body.friend } }
        );
    
        let promise2 = User.findOneAndUpdate(
          { "_id": req.body.friend },
          { "$pull": { "friends": req.body.user } }
        );

        await Promise.all([promise1, promise2,])

    } catch(err) {
        console.log(err)
    }

    return res.status(201).send()
}

const getUsers = async (req, res) => {

    const user = req.user
    console.log(req.user)
    if (!user) {
        console.log('user error')
        return res.status(500).end()
    }

    User.find({ _id: { $ne: req.user }}).then(function(users) {
        let jsonData = [{
            users: users,
            username: req.user
        }]
        return res.status(201).json(jsonData)
    })
}   


module.exports = {
    getAllUsers: getAllUsers,
    addFriend: addFriend,
    removeFriend: removeFriend,
    getUsers: getUsers
}