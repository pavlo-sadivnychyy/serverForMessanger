const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: String
        },
        name: {
            type: String
        },
        surname:{
            type: String
        },
        nickname:{
            type: String
        },
        email:{
            type: String
        },
        password:{
            type: String
        },
        phone_number:{
            type: String
        },
        dob:{
            type: String
        },
        gender:{
            type: String
        },
        languages:{
            type: String
        },
        file: {type: String, required: true},
    }, {timestamps: true})

module.exports =  mongoose.model("User", UserSchema)
