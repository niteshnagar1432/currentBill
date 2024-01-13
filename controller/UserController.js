const UserModel = require('../models/UserModel.js');
exports.DefaultController = (req, res) => {
    res.json({
        staus: false,
        message: "this is test."
    });
};

exports.SignIn = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        const user = await UserModel.findOne({
            username
        });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign({
            userId: user._id
        }, 'your-secret-key', {
            expiresIn: '1h'
        });

        res.status(200).json({
            token
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error during login'
        });
    }
};

exports.SignUp = async (req, res) => {
    try {
        const {
            username,
            password,
            name,
            email,
        } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            username,
            password: hashedPassword,
            name,
            email
        });
        await user.save();

        res.status(201).json({
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error creating user'
        });
    }
};