const otpGenerator = require('otp-generator');
const OTP = require('./models/otp.model');
const nodemailer = require('nodemailer');


const generateOtps = async ({email}) => {
    const otp = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false
    })
    try {
        await OTP.create({ email, otp  });
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
                name: "Crestwood",
                address: process.env.EMAIL,
            },
            to: email,
            subject: "OTP Verification",
            text: `Your OTP for verification is: ${otp}`
        })
        // res.status(200).send("OTP sent successfully")
        return otp;
    } catch (error) {
        console.error(error)
        // res.status(500).send("Error sending OTP")
    }
}
module.exports = generateOtps