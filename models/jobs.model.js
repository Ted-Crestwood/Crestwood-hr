const { Schema, model } = require("mongoose");

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
    deadline:{type:Date}

})
const Jobs = model("Jobs",jobSchema)
module.exports = Jobs;
