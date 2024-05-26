const Jobs = require("../models/jobs.model");

const createJob= async(req,res)=>{
    try {
        const job = await Jobs.create(req.body);
    if(job){
        res.status(201).json({message:'Job created'})
    }else{
        res.status(404).json({message: 'Job not created'})
    }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getJobs = async(req,res)=>{
    try {
        const jobs = await Jobs.find({});
        if(jobs){
            res.status(201).json(jobs)
        }else{
            res.status(404).json({message: 'Error fetching jobs...'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {createJob, getJobs}