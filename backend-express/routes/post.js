// import for routes
var express = require('express')
var router = express.Router()
const controllers = require('../controllers/post')

// makes the api end points
router
    .route('/')
    .get(controllers.getPosts)
    .post(controllers.addPosts)


module.exports = router

/*
router
  .route('/:id')
  .get(controllers.getPostsFromId)

router
  .route('/:id/friends')
  //.get(controllers.getFriends)

router
  .route('/:id/friends/:friendId')
  .get(controllers.getAllPostsBetweenUsers)
  .post(controllers.addPostBetweenUsers)
  .delete(controllers.removePostBetweenUsers)



  */