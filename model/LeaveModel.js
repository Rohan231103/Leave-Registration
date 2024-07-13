const { types } = require('joi');
const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    CurrentDate :{
        type:Date,
        required: true,
        validate:{
            validator: function(value) {
                return value > Date.now();
            },
            message: props => `${props.value} is not a valid leave Date`
        }
    },
    title:{
        type:String,
        required: true,  
        minlength: 3,
        maxlength: 100
    },
    Description:{
        type:String,
        required: true,
        minlength: 10,
    },
    LeaveDate:{
        type:Date,
        required: true,
        validate:{
            validator: function(value) {
                return value > Date.now();
            },
            message: props => `${props.value} is not a valid leave Date`
        }
    },
    status:{
        type:String,
        default: "Decline"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
})

const Leave = new mongoose.model("Leave", LeaveSchema);
module.exports = Leave;