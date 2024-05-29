const { Schema, model } = require("mongoose");


const OtpSchema = new Schema({
    email:{type:String},
    otp:{type:String}
},
{
    timestamps: true,
})

const OTP = model("Otp",OtpSchema)
module.exports = OTP;