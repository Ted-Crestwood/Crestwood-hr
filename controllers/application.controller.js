const Application = require("../models/application.model");
const Jobs = require("../models/jobs.model");
const { main } = require("../uploads/main");


const getApplications = async (req, res) => {
    try {
        const application = await Application.find({},{_id:0})
        res.status(200).json(application)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getApplicationsById = async (req, res) => {
    try {
        const {id} = req.params;
        const applications = await Application.findById(id,{_id:0});
        if (applications) {
            res.status(200).json(applications.person);
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const getApplicationByRefId = async (req, res) => {
    try {
        const refId= req.params.refId;
        const application = await Application.find({ refId:refId },{_id:0});
        if(!application){
            return res.status(404).json({message: "Job not found"})
        }
        res.status(201).json(application)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const createApplication = async (req, res) => {
    try {
        const {refId, ...applicationData} = req.body;
        const job = await Jobs.findOne({refId:refId})
        if(!job){
            res.status(404).json({message: 'Job does not exist'})
        }
        const application = await Application.create(applicationData);
        const user = application.person;
        const coverLetter = user.coverLetter.pdf;
        await main(coverLetter).catch(console.error)
        res.status(200).json({ message: `User created successfully` })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { createApplication, getApplications, getApplicationsById ,getApplicationByRefId};
// console.log("application:", application)

// const user = application.person[0];
// const academicPdf = user.academic;
// const coverLetter = user.coverLetter.pdf;
// const membershipPdf = user.membership[0].pdf;
// const professionalPdf = user.professional[0].pdf;;
// const shortCoursesPdf = user.shortCourses[0].pdf;
// const awsData = {academicPdf,coverLetter,membershipPdf,professionalPdf,shortCoursesPdf}
// await createAwsBucket(awsData);
