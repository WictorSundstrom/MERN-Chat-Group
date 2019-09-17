const Post = require('../models/post.model')


const allPost = (req, res) => {
    res.status(200).json({ data: 'adding book.....' })
}

const addPost = (req, res) => {


   
    res.status(200).json({ data: 'adding book.....' })
}

const getPost = (req, res) => {



    res.status(200).json({ data: 'adding book.....' })
}

const updatePost = (req, res) => {
    res.status(200).json({ data: 'updating book.....' })
}

const removePost = (req, res) => {
    res.status(200).json({ data: 'removing book.....' })
}


module.exports = { 
    allPost: allPost,
    addPost: addPost,
    getPost: getPost,
    updatePost: updatePost,
    removePost: removePost
}
