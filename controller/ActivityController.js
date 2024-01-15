const ActivityModel = require("../models/ActivityModel.js");

exports.allActivity = async (req, res) => {
    let { userId } = req.user;

    if (!userId) {
        return res.json({
            status: false,
            message: 'Invalid userId'
        });
    }

    try {
        let activities = await ActivityModel.find({ userId })
            .populate('bankId', 'name _id') // Pass fields to be populated as a string
            .sort({ createdAt: -1 });

        return res.json({
            status: true,
            message: 'Activities retrieved successfully',
            activities
        });
    } catch (error) {
        return res.json({
            status: false,
            message: 'Error retrieving activities'
        });
    }
};

exports.getOneActivity = async (req, res) => {
    let { userId } = req.user;
    let { activityId } = req.params;

    if (!userId || !activityId) {
        return res.json({
            status: false,
            message: 'Both userId and activityId are required to retrieve one activity'
        });
    }

    try {
        let activity = await ActivityModel.findOne({ userId, _id: activityId }).populate('bankId', 'name _id');

        if (!activity) {
            return res.json({
                status: false,
                message: 'Activity not found for the given user and activityId'
            });
        }

        return res.json({
            status: true,
            message: 'Activity retrieved successfully',
            activity
        });
    } catch (error) {
        return res.json({
            status: false,
            message: 'Error retrieving activity'
        });
    }
};

exports.getBankActivity = async (req, res) => {
    let { bankId } = req.params;
    let { userId } = req.user;

    if (!bankId || !userId) {
        return res.json({
            status: false,
            message: 'Both bankId and userId are required to retrieve bank activity'
        });
    }

    try {
        let activities = await ActivityModel.find({ $and: [{ bankId }, { userId }] }).sort({ createdAt: -1 });

        return res.json({
            status: true,
            message: 'Bank activities retrieved successfully',
            activities
        });
    } catch (error) {
        return res.json({
            status: false,
            message: 'Error retrieving bank activities'
        });
    }
};

exports.getActivitiesByDateRange = async (req, res) => {
    let { startDate, endDate } = req.body;
    let { userId } = req.user;

    if (!userId || !startDate || !endDate) {
        return res.json({
            status: false,
            message: 'userId, startDate, and endDate are required to retrieve activities within a date range'
        });
    }

    try {
        // Adjust the endDate to include activities on the same day
        let adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        let activities = await ActivityModel.find({
            userId,
            createdAt: { $gte: new Date(startDate), $lt: adjustedEndDate }
        }).populate('bankId', 'name _id').sort({ createdAt: -1 });

        return res.json({
            status: true,
            message: 'Activities within the date range retrieved successfully',
            activities
        });
    } catch (error) {
        return res.json({
            status: false,
            message: 'Error retrieving activities within the date range'
        });
    }
};

