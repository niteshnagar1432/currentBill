const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    token:String,
    isActive:{
        type:Boolean,
        default:false,
    },
    banks:[{
        type:mongoose.Schema.ObjectId,
        ref:'banks'
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('users',UserSchema);