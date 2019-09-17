const Post = require('../models/post.model')


const getAllPosts = (req, res) => {
    res.status(200).json({ data: 'adding book.....' })
}

const getPostsFromId = (req, res) => {


   
    res.status(200).json({ data: 'adding book.....' })
}

const getPostsFromId = (req, res) => {


   
    res.status(200).json({ data: 'adding book.....' })
}

const getAllPostsBetweenUsers = (req, res) => {



    res.status(200).json({ data: 'adding book.....' })
}

const addPostBetweenUsers = (req, res) => {
    res.status(200).json({ data: 'updating book.....' })
}

const removePostBetweenUsers = (req, res) => {
    res.status(200).json({ data: 'removing book.....' })
}


module.exports = { 
    getAllPosts: getAllPosts,
    getPostsFromId: getPostsFromId,
    getAllPostsBetweenUsers: getAllPostsBetweenUsers,
    addPostBetweenUsers: addPostBetweenUsers,
    removePostBetweenUsers: removePostBetweenUsers
}
