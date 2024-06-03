const { Schema, model } = require("mongoose");

const PasswordToken=new Schema({
    email:{type:String},
    token:{type:String}
})

const passwordToken = model('passwordToken',PasswordToken);
module.exports = passwordToken;