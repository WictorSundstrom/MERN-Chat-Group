// Import messages because that's where we want to save information.
const Messages = require('../models/post.model').Messages

// Addmessage
const addPosts = (req, res) => {
    
    // Creates a new Message with Author och Message
    Messages.create({
        author: req.user.username,
        message: req.body.message,
    }, function (err) {
    if (err) {
        res.sendStatus(500).res.send(err);
    }
    res.sendStatus(200)
    })
}


// Get the messages from the database
const getPosts = (req, res) => {
    Messages.find({}, (err, messages) => {
        if (err)
            res.sendStatus(500);
        res.send(messages)
    })
  };
  
  module.exports = {
    addPosts: addPosts,
    getPosts: getPosts
  };
  



/*
const Conversation = require('../models/post.model').Conversation
const Messages = require('../models/post.model').Messages
const User = require('../models/user.model')

const getAllPosts = (req, res) => {
    //res.status(200).json({ data: 'adding book.....' })
}

const getPostsFromId = (req, res) => {
    const user = req.user

    if (!user) {
        console.log('user error')
        return res.status(500).end()
    }

    return res.status(201).json(user)
}

const getAllPostsBetweenUsers = async (req, res) => {

    const user = req.user._id
    const friend = req.query.friendId


    if (!user) {
        console.log('user error')
        return res.status(500).end()
    }
    if (!friend) {
        console.log('friend error')
        return res.status(500).end()
    }

    await Conversation.findOne({ 'participants': [user, friend] }).exec(function (err, conversation) {
        if (err) {
            console.log("error finding")
            console.log(err)
        }

        if(conversation === null){
            
            const conv = new Conversation()
            conv.participants = [user, friend]
            conv.save(function (err, conv) {
                if (err) {
                    console.log("error creating conv")
                    console.log(err)
                    return res.status(500).end()
                } else {
                    console.log("Conversation skapad!")
                    return res.status(200)
                }
            })
        }
        if(conversation >= 0) {
            console.log(conversation)
            return res.status(200)
        }
    })    
}
    
    
    Conversation.find( { "participants" : { id: { $in : arrayOfIds } } }, callback );
    Conversation.find({ participants: {req.user }},{upsert: true}).then(function(users) {
        let jsonData = [{
            users: users,
            username: req.user
        }]
         })
        
    //return res.status(201).json(jsonData)
   

const addPostBetweenUsers = (req, res) => {
    //res.status(200).json({ data: 'updating book.....' })
}

const removePostBetweenUsers = (req, res) => {
    //res.status(200).json({ data: 'removing book.....' })
}


module.exports = { 
    getAllPosts: getAllPosts,
    getPostsFromId: getPostsFromId,
    getAllPostsBetweenUsers: getAllPostsBetweenUsers,
    addPostBetweenUsers: addPostBetweenUsers,
    removePostBetweenUsers: removePostBetweenUsers
}

*/