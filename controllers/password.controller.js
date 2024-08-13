const User = require("../models/user.model");
const sendMails = require("../util/sendMails");
const otpGenerator = require('otp-generator');
const bcrypt = require("bcrypt");

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.status(404).json({ message: 'User does not exist' })
        }
        let resetCode;
        if (!oldUser.resetCode) {
            resetCode = otpGenerator.generate(6, {
                digits: true,
                alphabets: false,
                upperCase: false,
                specialChars: false
            })
            await User.findOneAndUpdate(
                { email: oldUser.email },
                { resetCode },
                { new: true, useFindAndModify: false }
            );
        } else {
            resetCode = oldUser.resetCode
        }
        await sendMails({ email: email, subject: 'Password reset', text: `This is your verification code ${resetCode}`, name: 'Crestwood' })
        return res.status(201).json({ message: 'Reset code sent successfully to email' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const passwordCodeVerificaton = async (req, res) => {
    const { email, code } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const finalCode = user.resetCode;
        if (finalCode !== code) {
            return res.status(400).json({ message: "Invalid reset code" })
        }
        return res.status(200).json({ message: 'Reset code verified successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const verifyPassword = async (newPassword, oldPassword) => {
    const match = await bcrypt.compare(newPassword, oldPassword)
    return match
}
const resetPassword = async (req, res) => {
    const { password: newPassword } = req.body;
    try {
        const { refId } = req.params;
        const user = await User.findOne({ refId: refId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({ message: "New password cannot be the same as the old password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { forgotPassword, resetPassword, passwordCodeVerificaton };
// const { newPassword, code } = req.body;
// const user = await User.findById({ _id: id });
// const oldCode = await user.resetCode;
// if (oldCode !== code) {
//     return res.status(404).json({ message: 'User verification failed' })
// }
// const encryptedPassword = await bcrypt.hash(newPassword, 10);
// const pass = await verifyPassword(encryptedPassword, user.password)
// if (pass) {
//     return res.status(404).json({ message: 'Password already exists' })
// }
// user.password = encryptedPassword;
// return res.status(201).json({ message: 'New password created successfully' })