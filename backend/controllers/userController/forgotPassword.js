const User = require("../../models/userModels");
const bcrypt = require("bcrypt");

const forgotPassword = async (req, res) => {
    try {
        const { email, pass, pass1 } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json('Please enter correct email');
        }
        const { _id } = userExist;
        console.log(_id);

        if (pass !== pass1) {
            return res.status(400).json('Passwords do not match');
        }

        if (pass.length < 6 || pass.length >= 12) {
            return res.status(400).json('Password must be between 6 and 12 characters');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);
        const userData = await User.findByIdAndUpdate(_id, { password: hashedPassword }, { new: true });
        console.log(userData);
        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports = forgotPassword;
