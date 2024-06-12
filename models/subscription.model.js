const { default: mongoose } = require("mongoose");

const SubscriptionSchema = mongoose.Schema({
    email:{type:String, unique: true},
    jobCategory:{type:String}
})

const Subscription = mongoose.model("Subscription", SubscriptionSchema);
module.exports = Subscription;