const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')


const endSubscriptionMail = async (email) => {
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
        const hbsOptions = {
            viewEngine:{
                partialsDir:'views',
                layoutsDir:'views',
                defaultLayout:''
            },
            viewPath:'views'
        }
        transporter.use('compile', hbs(hbsOptions))
        function sendMail(to,subject,template){
            const mailOptions = {
                from: {
                    name: "Crestwood",
                    address: process.env.EMAIL,
                },
                to,
                subject,
                template
                // subject: 'Contact Form Submission',
                // text: `We have successfully received your message and will get back to you as soon as possible.`
            }
            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    return { status: 'Error sending mail' };
                }else{
                    return { status: 'Mail sent successfully' };
                }
            })
        }
        sendMail(email,"Contact Form Submission","subscriptionEndEmail")
        // await transporter.sendMail(mailOptions);
        return { status: 'success' };
    } catch (error) {
        console.error(error);
        return { status: 'error', message: "Error sending mail" };
    }
}

module.exports = endSubscriptionMail;
