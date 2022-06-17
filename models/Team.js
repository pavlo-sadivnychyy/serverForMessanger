const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    conversations: {
        type: Array,
        required: true
    },
    name: String,
    userId: String
}, {timestamps: true})

module.exports = mongoose.model("Team", TeamSchema)
