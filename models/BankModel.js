const mongoose = require('mongoose');

const BankSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    name: String,
    currentBalance: {
        type:String,
        default:'0'
    },
    bills: [{
        type: mongoose.Schema.ObjectId,
        ref: 'bills'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('bank', BankSchema);
