const Token = require('../models/token.model');
const nodemailer = require('nodemailer');
const User = require('../models/user.model');

const generateToken = async (req,resr) => {
    const {email,password} = req.body;
    if(name && password){
    const user = await User.findOne({email})
    console
    }
    try {
        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWTSECRET,
            {
                expiresIn: "2h"
            }
        )
        await new User({name:name,password:password,email:email,token}).save();
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
module.exports = {generateToken}