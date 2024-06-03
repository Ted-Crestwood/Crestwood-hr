const otpGenerator = require('otp-generator');
const OTP = require('../models/otp.model');
const nodemailer = require('nodemailer');


const sendMails = async ({ email, subject, text, name }) => {
    try {
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
                name: name,
                address: process.env.EMAIL,
            },
            to: email,
            subject: subject,
            text: `${text}`
        })
        // res.status(200).send("OTP sent successfully")
    } catch (error) {
        console.error(error)
        // res.status(500).send("Error sending OTP")
    }
}
module.exports = sendMails