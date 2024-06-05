const otpGenerator = require('otp-generator');
const OTP = require('../models/otp.model');
const nodemailer = require('nodemailer');
const User = require('../models/user.model');

const generateOtp = async (req,res) => {
    const { email } = req.body;
    const refId = generateRefId()
    const otp = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false
    })
    try {
        await OTP.create({ email, otp ,refId });
        const transporter = nodemailer.createTransport({
            // service: "SMTP",
            host: process.env.HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        })
        transporter.sendMail({
            from: {
                name: "Admin",
                address: process.env.EMAIL,
            },
            to: email,
            subject: "OTP Verification",
            text: `Your OTP for verification is: ${otp}`
        })
        res.status(200).send("OTP sent successfully")
        return otp;
    } catch (error) {
        console.error(error)
        return  res.status(500).send("Error sending OTP")
    }
}
function generateRefId(){
    return 'CRT'+Date.now().toString(36)+Math.random().toString(36).substring(2,5);
}

const verifyOtp = async ( req, res) => {
    const { email, otp } = req.body;
    try {
        const otpRecord = await OTP.findOne({ email , otp });
        if (otpRecord) {
            return  res.status(200).send("OTP verified successfully")
        } else {
            return  res.status(400).send("Invalid OTP")
        }
    } catch (error) {
        console.error(error)
        return  res.status(500).send("Error verifying OTP")
    }
}

module.exports = { generateOtp, verifyOtp }