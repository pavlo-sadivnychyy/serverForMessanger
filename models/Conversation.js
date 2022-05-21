const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    members: {
        type: Array
    },
    _id: {
        type: String
    },
    important: Boolean
}, {timestamps: true})

module.exports = mongoose.model("Conversation", ConversationSchema)
