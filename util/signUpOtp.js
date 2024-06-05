const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

const otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false
});
const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});
const signUpOtp = async ({ email }) => {
    try {
        const mailOptions = {
            from: "recruit@crestwood.co.ke",
            to: email,
            subject: "OTP Verification",
            text: `Your OTP for verification is: ${otp}`
        };
        transporter.sendMail(mailOptions);
        console.log(`OTP sent successfully to ${email}`);
        return otp;
    } catch (error) {
        console.error(`Error sending OTP to ${email}:`, error);

    }
};

module.exports = signUpOtp;
