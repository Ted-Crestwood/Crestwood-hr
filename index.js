const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const applicationRoute = require('./routes/application.route');
const userRoute = require('./routes/user.route')
const signInRoute = require('./routes/userSignIn')
const uploadCoverLetter = require('./routes/upload.route')
const getApplicationsById = require('./routes/application.route')
const dotenv = require('dotenv');
const { main } = require('./uploads/main');
const  createOrganisation  = require('./routes/organisation.route');
const  getAllOrganisation  = require('./routes/organisation.route');
const getOrganisationById  = require('./routes/organisation.route');
const  createJob  = require('./routes/job.route');
const getJobs  = require('./routes/job.route');
const generateOtp  = require('./routes/otp.route');
const  verification  = require('./routes/otpVerification.route');
const createShortlst = require('./routes/shortlist.route');
const getShortlistById = require('./routes/shortlist.route');
const getShortlist = require('./routes/shortlist.route');
const getJobsById  = require('./routes/job.route');
const deleteJob = require('./routes/job.route');
const updateJob = require('./routes/job.route');
const updateOrganisation= require('./routes/updateOrganisation.route');
const  deleteOrganisation  = require('./routes/updateOrganisation.route');
const updateShortlist  = require('./routes/updateShortlist.route');
const deleteShortlist  = require('./routes/updateShortlist.route');

dotenv.config()
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//routes
app.use('/users', userRoute);
app.use('/signin', signInRoute);
app.use('/signup', userRoute)
app.use('/users/:id', userRoute)
app.use('/applications', applicationRoute )
app.use('/applications/:id',getApplicationsById)
app.use('/apply', applicationRoute)
app.use('/upload/letter', uploadCoverLetter)
app.use('/create/organisations' ,createOrganisation)
app.use('/get/organisations', getAllOrganisation)
app.use('/get/organisations/:id', getOrganisationById)
app.use('/get/organisations/update/:id', updateOrganisation)
app.use('/get/organisations/delete/:id', deleteOrganisation)
app.use('/create/job', createJob)
app.use('/jobs', getJobs)
app.use('/jobs/:id', getJobsById)
app.use('/jobs/delete/:id', deleteJob)
app.use('/jobs/update/:id', updateJob)
app.use('/otp', generateOtp)
app.use('/otp/verification' , verification)
app.use('/create/shortlist', createShortlst)
app.use('/get/shortlist', getShortlist)
app.use('/get/shortlist/:id', getShortlistById)
app.use('/get/shortlist/update/:id', updateShortlist)
app.use('/get/shortlist/delete/:id', deleteShortlist)


const PORT = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;
app.listen(PORT, () => {
    console.log("Server listening on port 4000")
});
mongoose.connect(uri)
    .then(() => {
        console.log("Connected to database")

    })
    .catch((error) => {
        console.log(error.message)
    })



    
// app.get('/', (req, res) => {
//     res.send("Home pages...")
// });

// app.get('/api/products/:id',async(req,res)=>{
   
// })
// app.post('/api/products', async (req, res) => {
//     try {
//         const product = await Product.create(req.body);
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })
//update a product
// app.put('/api/products/:id',async(req,res)=>{
//     try {
//         const {id} = req.params;
//         const product = await Product.findByIdAndUpdate(id,req.body);
//         if(!product){
//             return res.status(404).json({message:"Product not found!"})
//         }
//         const updatedProduct = await Product.findById(id);
//         res.status(200).json(updatedProduct);
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// })
//delete a product
// app.delete('/api/products/:id',async(req,res)=>{
//     try {
//         const {id} = req.params;
//         const product = await Product.findByIdAndDelete(id);
//         if(!product){
//         return res.status(404).json({message: 'Product not found!'});
//         }
//         res.status(200).json({message: 'Product successfully deleted!'});
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// })
