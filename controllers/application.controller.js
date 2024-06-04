const Application = require("../models/application.model");
const Jobs = require("../models/jobs.model");
const User = require("../models/user.model");
const generateOtps = require("../otpGenerate");
const { main } = require("../uploads/main");
const sendMails = require("../util/sendMails");
const Token = require("../util/token");


const getApplications = async (req, res) => {
    try {
        const application = await Application.find({}, { _id: 0 })
        return res.status(200).json(application)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getApplicationsById = async (req, res) => {
    try {
        const { id } = req.params;
        const applications = await Application.findById(id, { _id: 0 });
        if (applications) {
            return res.status(200).json(applications.person);
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
const getApplicationByRefId = async (req, res) => {
    try {
        const refId = req.params.refId;
        const application = await Application.find({ refId: refId }, { _id: 0 });
        if (!application) {
            return res.status(404).json({ message: "Job not found" })
        }
        return res.status(201).json(application)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const createApplication = async (req, res) => {
    try {

        const { refId, email, fullName, ...applicationData } = req.body;
        const job = await Jobs.findOne({ refId: refId })
        if (!job) {
            return res.status(404).json({ message: 'Job does not exist' })
        }
        let user = await rr.findOne({ email: email });
        const password = await Token(1)
        if (!user) {
            user = await User.create({ email, password, name: fullName, password: password })
            await sendMails({ email: email, subject: 'Account creation', text: 'Your account was created successfully', name: fullName })
            return res.status(201).json({ message: 'Your account was created successfully' })
        }
        await generateOtps({ email })
        const application = await Application.create({ applicationData, userData: user._id, job: job._id });
        if (!application) {
            return res.status(404).json({ message: 'Failed to submit application' })
        }
        user.applications = application || [];
        return res.status(201).json({ message: 'Application submitted successful', applications: application, _id: 0 })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getTotalApplications = async (req, res) => {
    try {
        const totalApplications = await Application.countDocuments()
        return res.status(201).json({ totalJobs: totalApplications })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getApplicationsLast30Days = async (req, res) => {
    try {
        const today = new Date();
        const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
        const applications = await Application.find({
            createdAt: { $gte: thirtyDaysAgo }
        });
        console.log(applications)
        return res.status(200).json({ applications });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};


module.exports = { createApplication, getApplications, getApplicationsById, getApplicationByRefId, getTotalApplications, getApplicationsLast30Days };
