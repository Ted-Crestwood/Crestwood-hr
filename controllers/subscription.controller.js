const { exists } = require("../models/application.model");
const Subscription = require("../models/subscription.model");
const sendSubscription = require("../util/sendSubscription");
const cron = require('node-cron');

const scheduleEmail = (email) => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    const dayOfMonth = date.getDate();
    cron.schedule(`1 8 ${dayOfMonth} * *`, async () => {
        await sendSubscription(email, 'Monthly Subscription', 'Your monthly subscription has come to an end.');
    }, {
        scheduled: true,
        timezone: "Africa/Nairobi"
    });
};

const createSubscription = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(404).json({ message: "Provide your email" })
        }
        const emailExist = await Subscription.findOne({ email })
        if (emailExist) {
            return res.status(404).json({ message: "Email account already exists" })
        } else {
            scheduleEmail(email)
            Subscription.create({ email })
            sendSubscription(email, 'Monthly Subscription', 'Subscription successful.');
            return res.status(201).json({ message: "Subscription created successfuly" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getSubscribers = async (req, res) => {
    const subscriber = await Subscription.find({}, { _id: 0 })
    try {
        if (!subscriber) {
            res.status(404).json({ message: 'No subscribers yet' })
        } else {
            res.status(201).json({ message: 'Subscribers found', subscriber: subscriber })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createSubscription, getSubscribers }