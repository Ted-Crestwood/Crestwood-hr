const Application = require("../models/application.model");
const { main } = require("../uploads/main");


const getApplications = async (req, res) => {
    try {
        const application = await Application.find({})
        console.log("application")
        res.status(200).json(application)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getApplicationsById = async (req, res) => {
    try {
        const {id} = req.params;
        const applications = await Application.findById(id);
        if (applications) {
            res.status(200).json(applications.person);
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const createApplication = async (req, res) => {
    try {
        const application = await Application.create(req.body);
        const user = application.person;
        const coverLetter = user.coverLetter.pdf;
        const name = user.user
        await main(coverLetter).catch(console.error)
        console.log("coverLetter")
        res.status(200).json({ message: `User created successfully` })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { createApplication, getApplications, getApplicationsById };
// console.log("application:", application)

// const user = application.person[0];
// const academicPdf = user.academic;
// const coverLetter = user.coverLetter.pdf;
// const membershipPdf = user.membership[0].pdf;
// const professionalPdf = user.professional[0].pdf;;
// const shortCoursesPdf = user.shortCourses[0].pdf;
// const awsData = {academicPdf,coverLetter,membershipPdf,professionalPdf,shortCoursesPdf}
// await createAwsBucket(awsData);
