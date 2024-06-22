const otpGenerator = require('otp-generator');
const OTP = require('../models/otp.model');
const nodemailer = require('nodemailer');
const User = require('../models/user.model');
const hbs = require('nodemailer-express-handlebars')

function generateRefId() {
    return 'CRT' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
}

const generateOtp = async (req, res) => {
    const { email } = req.body;
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).send("Invalid email address");
    }

    const refId = generateRefId();
    const otp = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false
    });

    try {
        await OTP.create({ email, otp, refId });

        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });
        const hbsOptions = {
            viewEngine: {
                partialsDir: 'views',
                layoutsDir: 'views',
                defaultLayout: ''
            },
            viewPath: 'views'
        }
        transporter.use('compile', hbs(hbsOptions))
        function sendMail(to, subject, template, context) {
            const mailOptions = {
                from: "recruit@crestwood.co.ke",
                to,
                subject,
                template,
                context
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return res.status(500).send("Error sending OTP");
                } else {
                    console.log("Email sent:", info.response);
                    res.status(200).send("OTP sent successfully");
                }
            });

        }
        sendMail(email, "User verification", "userOtpVerification", { otp: otp })
    } catch (error) {
        console.error("Error creating OTP:", error);
        return res.status(500).send("Error sending OTP");
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const otpRecord = await OTP.findOne({ email, otp });
        if (otpRecord) {
            const userDetail = await User.findOneAndUpdate({ email: email }, { verified: true }, { new: true }).select('-_id')
            const {name,isAdmin,verified,refId,createdAt}  = userDetail;
            return res.status(200).json({message:"Verification successfully", userInfo:{name,email,isAdmin,verified,refId,createdAt}});
        } else {
            return res.status(400).json({message: "Invalid OTP"});
        }
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};

module.exports = { generateOtp, verifyOtp };
