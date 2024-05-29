const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
    try {
       const {email,password,name,isAdmin} = req.body;
       const existingEmail = await User.findOne({email});
       if(existingEmail){
        return res.status(400).json({message:"Email already exists"})
       }
       const hashPassword = await bcrypt.hash(password,10);
       const newUser = await User.create({
        isAdmin,
        name,
        email,
        password: hashPassword
       })
       await newUser.save();
       const token = jwt.sign(
        {id:newUser._id},
        process.env.JWTSECRET,
        {
            expiresIn:"2h"
        }
    )
    newUser.token = token
    newUser.password = undefined
    await new User({email,password,name,token}).save()
       res.status(201).json({message:"User created successfully", user: newUser})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(
            {id: user._id},
            process.env.JWTSECRET,
            {
                expiresIn:"2h"
            }
        );
        user.token = token;
        user.password = undefined

        const options = {
            expires: new Date(Date.now()+ 3 *24*60*1000),
            httpOnly:true
        }
        // res.status(200).cookie("token", token,options).json({
        //     success:true, token
        // })
        res.status(201).cookie("token", token,options).json({ message: "Sign in successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.find({})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getUserById = async (req, res) => {
    try {
        const {id} = req.params; 
        const user = await User.findById(id); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {createUser,getUser,signInUser,getUserById};
