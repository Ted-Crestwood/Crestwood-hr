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
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: null
    },
    verified: { type: Boolean, default: false },
    refId: { type: String, unique: true },
    resetCode: { type: String, default: null }
    // organisation: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation' }
},
    {
        timestamps: true,
    });

const User = mongoose.model("User", UserSchema);
module.exports = User;