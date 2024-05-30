const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const createUser = async (req, res) => {
    try {
        const { email, password, name, isAdmin } = req.body;
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const refId = generateRefId()
        const newUser = await User.create({
            refId,
            isAdmin,
            name,
            email,
            password: hashPassword,
            token:''
        })
        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWTSECRET,
            {
                expiresIn: "2h"
            }
        )
        newUser.token = token;
        await newUser.save();
        newUser.password = undefined
        return res.status(201).json({ message: "User created successfully", user: { email, name  }, token: token })
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
        let {name,refId,createdAt,verified} = user;
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
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
        return res.status(201).cookie("token", token, options).json({ message: "Sign in successfully" ,token:token,data:{name,refId,createdAt,verified,email}});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.find({}, { _id: 0,password:0 })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};



module.exports = { createUser, getUser, signInUser, getUserById };
