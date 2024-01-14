const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
    bankId: {
        type: mongoose.Schema.ObjectId,
        ref: 'bank'
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    billId: {
        type: mongoose.Schema.ObjectId,
        ref: 'bills'
    },
    currentBalance: String,
    amount: String,
    remainBalance: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('activity', ActivitySchema);
