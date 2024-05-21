const User = require("../models/user.model");
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
       const {email,password,name} = req.body;
       const existingEmail = await User.findOne({email});
       if(existingEmail){
        return res.status(400).json({message:"Email already exists"})
       }
       const hashPassword = await bcrypt.hash(password,10);
       const newUser = await User.create({
        name,
        email,
        password: hashPassword
       })
       res.status(201).json({message:"User created successfully", user: newUser})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
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
        const userId = req.params.id; 
        const user = await User.findById(userId); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
        // Authentication successful
        res.status(200).json({ message: "Sign in successfully", user });
    } catch (error) {
        // Internal server error
        res.status(500).json({ message: error.message });
    }
};

module.exports = {createUser,getUser,signInUser,getUserById};
