const mongoose = require('mongoose');

const BillSchema = mongoose.Schema({
    bankId:{
        type:mongoose.Schema.ObjectId,
        ref:'bank'
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'users'
    },
    ammount:String,
    details:String,
    currentBalance:String,
    remainBalance:String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('bills',BillSchema);