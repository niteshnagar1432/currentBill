const UserModel = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.DefaultController = (req, res) => {
    res.json({
        status: false,
        message: "This is a test."
    });
};

exports.SignIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                status: false,
                message: 'Both username and password are required for sign-in'
            });
        }

        const user = await UserModel.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_JWT, {
            expiresIn: '1h'
        });

        res.status(200).json({
            status:true,
            message:'Login Successfully.',
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error during login'
        });
    }
};

exports.SignUp = async (req, res) => {
    const { username, password, name, email } = req.body;

    if (!username || !password || !name || !email) {
        return res.status(400).json({
            status: false,
            message: 'All fields are required for sign-up'
        });
    }

    try {
        let user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409).json({
                status: false,
                message: 'User already exists. Please login.'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        let newUser = await UserModel.create({
            username,
            email,
            password: hashPassword,
            name
        });

        if (newUser) {
            const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_JWT, {
                expiresIn: '1h'
            });

            return res.status(201).json({
                status: true,
                message: 'User created successfully',
                token
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            error: 'Error creating user'
        });
    }
};
