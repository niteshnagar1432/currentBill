const ActivityModel = require("../models/ActivityModel.js");
const BankModel = require("../models/BankModel.js");
const BillModel = require('../models/BillModle.js');

exports.createBill = async (req, res) => {
    try {
        const { bankId, amount, details } = req.body;
        const { userId } = req.user;

        if (!bankId || !amount || !details) {
            return res.status(400).json({
                status: false,
                message: 'BankId, amount, and details are required to create a bill'
            });
        }

        const bank = await BankModel.findOne({ _id: bankId });

        if (!bank) {
            return res.status(404).json({
                status: false,
                message: 'Bank not found'
            });
        }

        if (bank.currentBalance < amount) {
            return res.status(400).json({
                status: false,
                message: 'Insufficient funds in your account'
            });
        }

        const remainBalance = bank.currentBalance - amount;

        const bill = await BillModel.create({
            userId,
            bankId,
            details,
            currentBalance: bank.currentBalance,
            amount,
            remainBalance,
        });

        const activity = await ActivityModel.create({
            userId,
            bankId,
            billId: bill._id,
            amount,
            currentBalance: bank.currentBalance,
            remainBalance,
            message: `${bank.name} ₹${amount} debited.`
        });

        bank.currentBalance = remainBalance;
        bank.bills.push(bill._id);
        await bank.save();

        return res.status(201).json({
            status: true,
            message: 'Bill created successfully',
            bill
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: 'Error creating bill'
        });
    }
};

exports.allBills = async (req, res) => {
    let { userId } = req.user;

    if (!userId) {
        res.json({
            status: false,
            message: 'Invalid User ID'
        });
    }

    try {
        const bills = await BillModel.find({ userId })
            // .populate({
            //     path: 'userId',
            //     model: 'UserModel', // Replace with the actual model name for the user
            // })
            // .populate({
            //     path: 'bank', // Corrected from 'banks' to 'bank'
            //     model: 'BankModel', // Replace with the actual model name for the bank
            // });

        res.json({
            status: true,
            message: 'Bills retrieved successfully',
            data: bills,
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: false,
            error: 'Error retrieving bills',
        });
    }
};

