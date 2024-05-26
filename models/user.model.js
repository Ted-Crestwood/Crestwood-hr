const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter User name"]
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},
    {
        timestamps: true,
    });

    const User = mongoose.model("User",UserSchema);
    module.exports = User;