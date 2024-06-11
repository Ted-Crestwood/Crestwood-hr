const { default: mongoose } = require("mongoose");

const SubscriptionSchema = mongoose.Schema({
    email:{type:String},
    jobCategory:{type:String}
})

const Subscription = mongoose.model("Subscription", SubscriptionSchema);
module.exports = Subscription;