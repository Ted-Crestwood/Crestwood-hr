const Token = require('../models/token.model');
const otpGenerator = require('otp-generator');
const OTP = require('../models/otp.model');
const nodemailer = require('nodemailer');

export const generateToken = async (email,newUser) => {
    console.log("otp generated:", email)
    const token = jwt.sign(
        { id: newUser._id },
        process.env.JWTSECRET,
        {
            expiresIn: "2h"
        }
    )
    try {
        await Token.create({ email, token });
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
            subject: "Token",
            text: `Your token for verification is: ${token}`
        })
        res.status(200).send("Token sent successfully")
    } catch (error) {
        console.error(error)
        res.status(500).send("Error sending Token")
    }
}


// const verifyOtp = async ( req, res) => {
//     const { email, otp } = req.body;
//     try {
//         const otpRecord = await OTP.findOne({ email , otp });
//         if (otpRecord) {
//             res.status(200).send("OTP verified successfully")
//         } else {
//             res.status(400).send("Invalid OTP")
//         }
//     } catch (error) {
//         console.error(error)
//         res.status(500).send("Error verifying OTP")
//     }
// }

