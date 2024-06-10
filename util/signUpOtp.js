const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const OTP = require('../models/otp.model');

const signUpOtp = async ({email}) => {
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).send("Invalid email address");
    }

    // const refId = generateRefId();
    const otp = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false
    });

    try {
        await OTP.create({ email, otp });

        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: "recruit@crestwood.co.ke",
            to: email,
            subject: "OTP Verification",
            text: `Your OTP for verification is: ${otp}`
        };


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                // return res.status(500).send("Error sending OTP");
            } else {
                console.log("Email sent:", info.response);
                // res.status(200).send("OTP sent successfully");
            }
        });
        return otp;
    } catch (error) {
        console.error("Error creating OTP:", error);
        // return res.status(500).send("Error sending OTP");
    }
}

module.exports = signUpOtp;
