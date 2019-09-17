// Import mongoose to save information
const mongoose = require('mongoose')

// Make a schema how we want it
const messageSchema = new mongoose.Schema(
    {
        author: {
            type: String
        },
        message: {
            type: String
        }
    },
    { timestamp: true }
);

const Messages = mongoose.model('messages', messageSchema)
module.exports = { Messages }




/*
const conversationSchema = new mongoose.Schema({
        identifier: {
            type: Number,
            required: false,
            unique: true
        },
        participants: [{
            type: mongoose.Schema.Types.ObjectId
        }]
})



const messageSchema = new mongoose.Schema({

    Message: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        }, 
        content: {
            type: String,
            require: true
        },
        time_created: {
            type: Date   
        },
        converstationId: {
            type: Number
        }
    }]
})


conversationSchema.pre("validate", function(next) {

    var doc = this;

    if(typeof position !== "number") {
        mongoose.model("conversation").count(function(err, num) {
            if(err)
                return next(err);
            doc.identifier = num;
            return next();
        });
    } else if(this.isModified("identifier") || this.isNew()) {
        mongoose.model("conversation").where({_id: {$ne: this._id}, identifier: this.identifier}).count( function (err, identifier) {
            if(err)
                return next(err);
            if(identifier > 0) {
                mongoose.model("conversation").update({identifier: {$gte: this.identifier}}, {position: {$inc: 1}}, {multi: 1}, function(err, numAffected) {
                    next(err);
                });

            } else {
                next();
            }
        });
    } else {
        next();
    }
});



const Conversation = mongoose.model('conversation', conversationSchema)
const Messages = mongoose.model('messages', messageSchema)

module.exports = {
    Conversation,
    Messages
}

*/