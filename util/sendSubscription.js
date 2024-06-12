const nodemailer = require('nodemailer');

const sendSubscription = async (email) => {
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
                name: "Crestwood",
                address: process.env.EMAIL,
            },
            to: email,
            subject: 'Newsletter Subscription',
            text: `Subscription successful`
        })
        // res.status(200).send("OTP sent successfully")
    } catch (error) {
        console.error(error)
        // res.status(500).send("Error sending OTP")
    }
}
module.exports = sendSubscription;