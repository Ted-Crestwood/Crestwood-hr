const Application = require("../models/application.model");


const getApplications = async (req, res) => {
    try {
        const application = await Application.find({})
        res.status(200).json(application)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const createApplication = async (req, res) => {
    try {
        const application = await Application.create(req.body);
        console.log("application:",application)
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { createApplication, getApplications };

// const user = application.person[0];
// const academicPdf = user.academic;
// const coverLetter = user.coverLetter.pdf;
// const membershipPdf = user.membership[0].pdf;
// const professionalPdf = user.professional[0].pdf;;
// const shortCoursesPdf = user.shortCourses[0].pdf; 
// const awsData = {academicPdf,coverLetter,membershipPdf,professionalPdf,shortCoursesPdf}
// await createAwsBucket(awsData);
