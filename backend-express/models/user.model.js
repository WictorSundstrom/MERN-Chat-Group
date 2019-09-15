const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
        friends: [ { 
            username : {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'username'
            },
            status : {
               type: String
            } 
        }]         
    },
    {
        timestamp: true
    }
)

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