var express = require('express')
var router = express.Router()
const controllers = require('../controllers/post')

router
  .route('/')
  .get(controllers.allPost)
  .post(controllers.addPost)

router
  .route('/:id')
  .get(controllers.getPost)
  .put(controllers.updatePost)
  .delete(controllers.removePost)

  module.exports = router