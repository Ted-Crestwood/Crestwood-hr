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
        const oldResetCode = oldUser.resetCode;
        if (oldResetCode === 'null') {
            const newCode = otpGenerator.generate(6, {
                digits: true,
                alphabets: false,
                upperCase: false,
                specialChars: false
            })
            const codeUpdate = await User.findOneAndUpdate({ email: oldUser.email }, { resetCode: newCode }, { new: true, useFindAndModify: false });
            await sendMails({ email: email, subject: 'Password reset', text: `This is your verification code ${codeUpdate.resetCode}`, name: 'Crestwood' })
            return res.status(200).json({ message: 'User reset code created and mail sent' })
        }
        await sendMails({ email: email, subject: 'Password reset', text: `This is your verification code ${oldResetCode}`, name: 'Crestwood' })
        return res.status(201).json({ message: 'Link sent successfully' })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const verifyPassword = async (newPassword, oldPassword) => {
    const match = await bcrypt.compare(newPassword, oldPassword)
    return match
}
const resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword, code } = req.body;
        const user = await User.findById({ _id: id });
        const oldCode = await user.resetCode;
        if (oldCode !== code) {
            return res.status(404).json({ message: 'User verification failed' })
        }
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const pass = await verifyPassword(encryptedPassword, user.password)
        if (pass) {
            return res.status(404).json({ message: 'Password already exists' })
        }
        user.password = encryptedPassword;
        return res.status(201).json({message: 'New password created successfully'})
    } catch (error) {

    }
}

module.exports = { forgotPassword, resetPassword };