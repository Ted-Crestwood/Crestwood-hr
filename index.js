const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const applicationRoute = require('./routes/application.route');
const userRouter = require('./routes/user.route')
const signInRoute = require('./routes/userSignIn')
const getApplicationsById = require('./routes/application.route')
const dotenv = require('dotenv');
dotenv.config()
const createOrganisation = require('./routes/organisation.route');
const getAllOrganisation = require('./routes/organisation.route');
const getOrganisationById = require('./routes/organisation.route');
const createJob = require('./routes/job.route');
const getJobs = require('./routes/job.route');
const generateOtp = require('./routes/otp.route');
const verification = require('./routes/otpVerification.route');
const createShortlst = require('./routes/shortlist.route');
const getShortlistById = require('./routes/shortlist.route');
const getShortlist = require('./routes/shortlist.route');
const deleteJob = require('./routes/job.route');
const updateJob = require('./routes/job.route');
const updateOrganisation = require('./routes/updateOrganisation.route');
const deleteOrganisation = require('./routes/updateOrganisation.route');
const updateShortlist = require('./routes/updateShortlist.route');
const deleteShortlist = require('./routes/updateShortlist.route');
const cookieParser = require('cookie-parser');
const getJobByRefId = require('./routes/jobRef.route');
const file = require('./routes/file.route');
const forgotPassword = require('./routes/password.route');
const {resetPassword} = require('./controllers/password.controller');
const getOpenJobs = require('./routes/jobRef.route')
const  {getTotalApplications, getApplicationsLast30Days} = require('./controllers/application.controller');
// const  handleTurnstile  = require('./routes/turnstile.route');
const Subscription = require('./routes/subscriber.route');
const getSubscribers  = require('./routes/subscriber.route');
const  handleTurnstilePost  = require('./routes/turnstile.route');
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

//routes

app.use('/users', userRouter);
app.use('/forgot/password',forgotPassword)
app.use('/reset/password/:refId', resetPassword)
app.use('/applications/all', applicationRoute )
app.use('/applications/:id', getApplicationsById)
app.use('/applications', getTotalApplications)
app.use('/applications/thirtydays' , getApplicationsLast30Days)
// app.use('/applications/open', getOpenJobs)
app.use('/apply', applicationRoute)
app.use('/create/organisations', createOrganisation)
app.use('/get/organisations', getAllOrganisation)
app.use('/get/organisations/:id', getOrganisationById)
app.use('/get/organisations/update/:id', updateOrganisation)
app.use('/get/organisations/delete/:id', deleteOrganisation)
app.use('/create/job', createJob)
app.use('/jobs', getJobs)
app.use('/open', getOpenJobs)
// app.use('/api', fileUpload)
// app.use('/jobs/:id', getJobsById)
app.use('/jobs/:refId', getJobByRefId)
app.use('/jobs/delete/:id', deleteJob)
app.use('/jobs/update/:id', updateJob)
// app.use('/otp', generateOtp)
app.use('/otp/verification', verification)
app.use('/create/shortlist', createShortlst)
app.use('/get/shortlist', getShortlist)
app.use('/get/shortlist/:id', getShortlistById)
app.use('/get/shortlist/update/:id', updateShortlist)
app.use('/get/shortlist/delete/:id', deleteShortlist)
app.use('/upload', file) 
app.use('/file',file)

// app.use('/turnstile', handleTurnstile)
app.use('/turnstile/verification', handleTurnstilePost)
app.use('/newsletter', Subscription)
// app.use('/newsletter/subscribers', getSubscribers)
app.get('/',(req,res)=>{res.send('Welcome to crestwood hr db')})
const PORT = process.env.PORT || 4002;
const uri = process.env.MONGO_URI;
app.listen(PORT, () => {
    console.log("Server listening on port 4002")
});
mongoose.connect("mongodb+srv://ted:7668Tamera@api.0aohuqy.mongodb.net/?retryWrites=true&w=majority&appName=api")
    .then(() => {
        console.log("Connected to database")

    })
    .catch((error) => {
        console.log(error.message)
    })

