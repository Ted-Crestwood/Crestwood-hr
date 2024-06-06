const OTP = require("../models/otp.model");

const verifyOtp = async ( { email, otp }) => {
    try {
         await OTP.findOne({ email , otp });
         return true;
    } catch (error) {
        console.error(error)
    }
}

module.exports = {verifyOtp};