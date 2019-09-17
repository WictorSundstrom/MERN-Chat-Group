// import for routes
var express = require('express')
var router = express.Router()
const controllers = require('../controllers/user')

// makes the api end points
router
    .route('/')
    .get(controllers.getUsername)

    
module.exports = router