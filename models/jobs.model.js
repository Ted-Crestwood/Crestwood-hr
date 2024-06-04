const { Schema, model, default: mongoose } = require("mongoose");

const jobSchema = new Schema({
    title:{type:String},
    location:{type:String},
    salary:{type:Number},
    level:{type:String},
    jobType:{type:String},
    department:{type:String},
    description:{type:String},
    responsibilities:{type:String},
    requirements:{type:String},
    goToHave:{type:String},
    deadline:{type:Date},
    organisation:{type:Object},
    createdOn:{type:String},
    publishOn:{type:String},
    extraInformation:{type:String},
    paymentFormat:{type:String},
    contractType:{type:String},
    slug:{type:String},
    refId: { type: String, unique: true }
},
{
    timestamps: true,
})
const Jobs = mongoose.model("Jobs",jobSchema)
module.exports = Jobs;
