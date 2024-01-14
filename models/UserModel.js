const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    token: String,
    isActive: {
        type: Boolean,
        default: false,
    },
    banks: [{
        type: mongoose.Schema.ObjectId,
        ref: 'bank' // Change 'banks' to 'bank'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('users', UserSchema);