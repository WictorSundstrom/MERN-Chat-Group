const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        user1: {
            type: String,
            require: true,
            unique: true,
            trim: true
        },
        user2: {
            type: String,
            require: true,
            unique: true,
            trim: true
        },
        message : {
            type: String,
            require: true,
            trim: true
        }        
    },
    {
        timestamp: true
    }
)