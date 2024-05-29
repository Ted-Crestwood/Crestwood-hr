const { Schema, model } = require("mongoose");


const tokenSchema = new Schema({
    token:{type:String},
    email:{type:String}
})

const Token = model("Token",tokenSchema);
module.exports = Token;