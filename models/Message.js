const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
    conversationId: {
        type: String,
        required: true
    },
        sender:{
            type: String
        },
        text:{
            type: String
        },
        type: {
            type: String
        },
        file: {type: String}
}, {timestamps: true})

module.exports =  mongoose.model("Message", MessageSchema)
