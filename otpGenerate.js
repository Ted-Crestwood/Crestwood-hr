const otpGenerator = require('otp-generator');
const OTP = require('./models/otp.model');
const nodemailer = require('nodemailer');


const generateOtps = async ({email}) => {
    if(!email){
        console.log('No email address was submitted')
    }
    const otp = otpGenerator.generate(6, {
        digits: true,
        alphabets: false,
        upperCase: false,
        specialChars: false
    })
    try {
        const otpExists = await OTP.findOne({email:email})
        if(!otpExists){
            await OTP.create({ email, otp  });
        }
        await OTP.updateOne({email:email}, {otp:otp})
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        })
        transporter.sendMail({
            from: "recruit@crestwood.co.ke",
            to: email,
            subject: "OTP Verification",
            text: `Your OTP for verification is: ${otp}`
        })
        return otp;
    } catch (error) {
        console.error(error)
    }
}
module.exports = {generateOtps}