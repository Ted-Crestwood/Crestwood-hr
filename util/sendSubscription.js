const nodemailer = require('nodemailer');

const sendSubscription = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: {
                name: "Crestwood HR",
                address: process.env.EMAIL,
            },
            to: email,
            subject: subject,
            text: text
        };
        const info = await transporter.sendMail(mailOptions);
        return { status: "Success"+ info.response };
    } catch (error) {
        return { status:  error.message };
    }
}

module.exports = sendSubscription;
