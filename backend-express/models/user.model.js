// Import mongoose and bcrypt to encrypt and save information
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Make a schema how we want it
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        rights: {
            type: String,
            require: true,
        },
        status : {
            type: String,
            require: true
        },
        friends: [{
            type: String
        }],       
    },
    {
        timestamp: true
    }
)

// Before saving a user, hash it and then return it
userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
      return next()
    }
  
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) {
        return next(err)
      }
  
      this.password = hash
      next()
    })
})

// Check if the password coming in is the same as the hashed value in the db
userSchema.methods.checkPassword = function(password) {
    const passwordHash = this.password
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if(err) {
                return reject(err)
            }
            resolve(same)
        })
    })
}

const User = mongoose.model('users', userSchema)
module.exports = User
