const OTP = require("./models/otp.model");

const verifyOtp = async ({email,otp}) => {
    try {
        const otpRecord = await OTP.findOne({ email , otp });
        if (otpRecord) {
            res.status(200).send("OTP verified successfully")
        } else {
            res.status(400).send("Invalid OTP")
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Error verifying OTP")
    }
}
module.exports = verifyOtp;