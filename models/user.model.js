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
    refId: { type: String, unique: true }
    // organisation: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation' }
},
    {
        timestamps: true,
    });

const User = mongoose.model("User", UserSchema);
module.exports = User;