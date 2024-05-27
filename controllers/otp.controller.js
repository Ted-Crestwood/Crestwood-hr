const otpGenerator = require('otp-generator');
const OTP = require('../models/otp.model');
const nodemailer = require('nodemailer');

const generateOtp = async (req, res) => {
    const { email } = req.body;
    const otp = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false
    })
    try {
        await OTP.create({ email, otp });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: process.env.HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.USER_PASSWORD
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
    } catch (error) {
        console.error(error)
        res.status(500).send("Error sending OTP")
    }
}


const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const otpRecord = await OTP.findOne({ email, otp });
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

module.exports = { generateOtp, verifyOtp }