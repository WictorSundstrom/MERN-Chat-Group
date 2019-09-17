var express = require('express')
var router = express.Router()
const controllers = require('../controllers/post')

router
  .route('/')
  .get(controllers.getAllPosts)

router
  .route('/:id')
  .get(controllers.getPostsFromId)

router
  .route('/:id/friends')
  .get(controllers.getFriends)

router
  .route('/:id/friends/:friendId')
  .get(controllers.getAllPostsBetweenUsers)
  .post(controllers.removePostBetweenUsers)
  .delete(controllers.removePostBetweenUsers)

  module.exports = router