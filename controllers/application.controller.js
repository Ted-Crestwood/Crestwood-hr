const Application = require("../models/application.model");
const Jobs = require("../models/jobs.model");
const generateOtps = require("../otpGenerate");
const { main } = require("../uploads/main");


const getApplications = async (req, res) => {
    try {
        const application = await Application.find({},{_id:0})
        return  res.status(200).json(application)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getApplicationsById = async (req, res) => {
    try {
        const {id} = req.params;
        const applications = await Application.findById(id,{_id:0});
        if (applications) {
            return   res.status(200).json(applications.person);
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
const getApplicationByRefId = async (req, res) => {
    try {
        const refId= req.params.refId;
        const application = await Application.find({ refId:refId },{_id:0});
        if(!application){
            return res.status(404).json({message: "Job not found"})
        }
        return res.status(201).json(application)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const createApplication = async (req, res) => {
    try {
        
        const {refId,email, ...applicationData} = req.body;
        const job = await Jobs.findOne({refId:refId})
        if(!job){
            return res.status(404).json({message: 'Job does not exist'})
        }
        await generateOtps({email})
        const application = await Application.create(applicationData);
        if(!application){
            return res.status(404).json({message:'Failed to create application'})
        }
        return res.status(201).json({message:'Application successful',applications:application ,_id:0})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { createApplication, getApplications, getApplicationsById ,getApplicationByRefId};
