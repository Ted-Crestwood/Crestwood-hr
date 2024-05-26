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
dotenv.config();

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
app.use('/create/job', createJob)
app.use('/jobs', getJobs)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database")

        app.listen(4000, () => {
            console.log("Server listening on port 4000")
        });
    })
    .catch(() => {
        console.log("Connection failed!")
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
