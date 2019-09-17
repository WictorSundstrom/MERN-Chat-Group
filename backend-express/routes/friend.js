var express = require('express')
var router = express.Router()
const controllers = require('../controllers/friend')

router
  .route('/')
  .get(controllers.loadAllFriend)

router
  .route('/:id')
  .get(controllers.loadFriend)
  .post(controllers.addFriend)
  .delete(controllers.removeFriend)

  module.exports = router