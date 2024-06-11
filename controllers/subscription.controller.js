const Subscription = require("../models/subscription.model");

const createSubscription = async (req, res) => {
    const subs = req.body;
    try {
        if (!subs) {
            res.status(404).json({ message: 'Failed to create subscription' })
        } else {
            await Subscription.create(subs)
            res.status(201).json({ message: 'Subscription created successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getSubscribers = async (req, res) => {
    const email = req.body;
    try {
        if (!email) {
            res.status(404).json({ message: 'User is not subscribed' })
        } else {
            const subscriber = await Subscription.find({ email: email })
            res.status(201).json({ message: 'Subscriber found', subscriber: subscriber })
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {createSubscription,getSubscribers}