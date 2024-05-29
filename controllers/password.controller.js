const User = require("../models/user.model");
const crypto = require('crypto');
const nodemailer = require('nodemailer')

const forgotPassword =async(req,res)=>{
    try {
        const {email} = req.body;
        const userDetails = await User.find({email})
        if(!userDetails){
            res.status(404).json({message: 'Email not found!'})
        }
        const token = crypto.randomBytes(20).toString('hex')
        const tokenExpiration = Date.now() + 3600000;
        userDetails.resetPasswordToken = token;
        userDetails.resetPasswordExpires = tokenExpiration;
        await userDetails.save();
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
                name: "Admin",
                address: process.env.EMAIL,
            },
            to: email,
            subject: "Password reset",
            text: `Your reset token is ${token}`
            `Please click on the following link, or paste this into your browser to complete the process`
            + `http://${req.headers.host}/reset-password/${token}`
            + `If you did not request this, please ignore this email and your password will remain unchanged.`
        }) 
        res.status(201).json({
            message:'Token sent successfully'
        })
    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }
}
const resetPassword=async(req,res)=>{
    try {
        const {token} =req.params;
        const {newPassword} =req.body;
    } catch (error) {
        
    }
}