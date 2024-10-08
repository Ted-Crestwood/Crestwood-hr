const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateOtps = require("../otpGenerate");
const verifyOtp = require("../util/otpVerification");
const signUpOtp = require("../util/signUpOtp");



const createUser = async (req, res) => {
    try {
        const { email, password, name, isAdmin } = req.body;
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const refId = generateRefId()
        const otp = await signUpOtp(req, res)
        if (!otp) {
            return res.status(404).json({ message: 'Falied to send OTP verification code to email' })
        }
        const token = jwt.sign(
            { id: 1 },
            process.env.JWTSECRET,
            {
                expiresIn: "2h"
            }
        )
        let newUser = await User.create({
            refId,
            isAdmin,
            name,
            email,
            password: hashPassword,
            token: token
        })
        newUser.token = token;
        const { createdAt, verified } = newUser;
        return res.status(201).json({ message: "User created successfully", user: { email, name, refId, createdAt, verified, }, token: token })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

function generateRefId() {
    return 'CRT' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
}
const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User account does not exist!' })
        }
        let { refId, createdAt, verified } = user;
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!user && !isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWTSECRET,
            {
                expiresIn: "2h"
            }
        );
        user.token = token;

        user.password = undefined

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
            httpOnly: true
        }
        return res.status(201).cookie("token", token, options).json({ message: "Sign in successfully", token: token, data: { refId, createdAt, verified, email } });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.find({}, { _id: 0, password: 0 })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getUserByRefId = async (req, res) => {
    const searchRef = req.params.refId;
    try {
        const user = await User.findOne({ refId: searchRef })
        if (user) {
            return res.status(200).json({ message: user })
        }
        return res.status(400).json({ message: "User not found!" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


module.exports = { createUser, getUser, signInUser, getUserByRefId };
