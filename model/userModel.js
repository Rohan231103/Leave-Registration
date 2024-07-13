const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    Fname:{
        type:String,
    },
    Lname:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})

const User = new mongoose.model("user", userSchema);
module.exports = User;