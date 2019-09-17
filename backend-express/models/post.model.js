const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({

    Conversation: {
        id: {
            type: Number,
        },
        participants: [{
            type: mongoose.Schema.Types.ObjectId
        }]
    }
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



const conversation = mongoose.model('conversation', conversationSchema)
const messages = mongoose.model('messages', messageSchema)

module.exports = {
    conversation: conversation,
    messages: messages
}