// Import user as we modify it
const User = require('../models/user.model')

// get all users in the database
const getAllUsers = async (req, res) => {

    User.find({}).then(function(users) {
        let jsonData = [{ users: users }]
        return res.status(201).json(jsonData)
    })
}   

// add a friend, find the ip och the person adding and updating it and the other persons friends with the ID of eachother
const addFriend = async (req, res) => {
    
    // tries to find and update
    try {
        let promise1 = User.findOneAndUpdate(
          { "_id": req.user },
          { "$push": { "friends": req.body.friend } }
        );
    
        let promise2 = User.findOneAndUpdate(
          { "_id": req.body.friend },
          { "$push": { "friends": req.body.user } }
        );
        
        // tells the program that there are things that wants to be done, this to enhance the responsiveness of the site
        await Promise.all([promise1, promise2,])
     
        // If error occures, log it
    } catch(err) {
        console.log(err)
    }

    return res.status(201).send()
}

// remove a friend, find the ip och the person removing by the ID of eachother
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

// load friends of the ID requesting it, excluding himself
const getFriends = async (req, res) => {

    const user = req.user
    
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
    getFriends: getFriends
}