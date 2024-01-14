const ActivityModel = require("../models/ActivityModel");
const BankModel = require("../models/BankModel");
const UserModel = require("../models/UserModel");

exports.DefaultController = (req, res) => {
    res.json({
        status: false,
        message: "This is a test."
    });
};

exports.addBank = async (req, res) => {
    try {
        const { name } = req.body;
        const { userId } = req.user;

        if (!name) {
            return res.status(400).json({
                status: false,
                message: 'Name is required for adding a bank'
            });
        }

        const bank = await BankModel.create({
            name,
            userId
        });


        if (bank) {

            const user = await UserModel.findOne({_id:userId});
            await user.banks.push(bank.id);
            user.save();

            const activity = await ActivityModel.create({
                bankId:bank._id,
                userId,
                currentBalance:bank.currentBalance,
                amount:'0',
                remainBalance:bank.currentBalance,
                message:'bank added sucessfully.'
            });

            if(activity){
                return res.status(201).json({
                    status: true,
                    message: 'Bank added successfully',
                    bank
                });
            }

        } else {
            return res.status(500).json({
                status: false,
                message: 'Failed to add bank'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: 'Error adding bank'
        });
    }
};

exports.addBalance = async (req, res) => {
    try {
        const { bankId, amount } = req.body;
        const { userId } = req.user;

        if (!bankId || !amount || !userId) {
            return res.status(400).json({
                status: false,
                message: 'Both bankId and amount are required to add balance'
            });
        }

        let bank = await BankModel.findOne({ _id: bankId });

        if (!bank) {
            return res.status(404).json({
                status: false,
                message: 'Bank not found'
            });
        }

        let currentBalance = bank.currentBalance;
        bank.currentBalance = parseInt(bank.currentBalance) + parseInt(amount); // Convert to integers
        await bank.save();

        let activity = await ActivityModel.create({
            userId,
            bankId,
            amount,
            currentBalance,
            remainBalance: bank.currentBalance,
            message: `${bank.name} ₹${amount} added.`
        });

        if (activity) {
            return res.status(200).json({
                status: true,
                message: 'Balance added successfully',
                bank
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: 'Error adding balance'
        });
    }
};
