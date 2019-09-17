// import for routes
var express = require('express')
var router = express.Router()
const controllers = require('../controllers/friend')

// makes the api end points
router
  .route('/')
  .get(controllers.getAllUsers)

router
  .route('/:id')
  .get(controllers.getFriends)
  .post(controllers.addFriend)
  .delete(controllers.removeFriend)

module.exports = router