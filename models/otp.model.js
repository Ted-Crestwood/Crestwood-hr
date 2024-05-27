const { Schema, model } = require("mongoose");


const OtpSchema = new Schema({
    email:{type:String},
    otp:{type:String}
})

const OTP = model("Otp",OtpSchema)
module.exports = OTP;