const Jobs = require("../models/jobs.model");

const createJob = async (req, res) => {
    try {
        const refId = generateRefId()
        const jobData = { ...req.body, refId }
        const job = await Jobs.create(jobData);
        if (job) {
            res.status(201).json({ message: 'Job created' })
        } else {
            res.status(404).json({ message: 'Job not created' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
function generateRefId() {
    return 'CRT' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
}
const getJobs = async (req, res) => {
    try {
        const jobs = await Jobs.find({});
        if (jobs) {
            res.status(201).json(jobs)
        } else {
            res.status(404).json({ message: 'Error fetching jobs...' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getJobsById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Jobs.findById(id)
        if (job) {
            res.status(201).json(job)
        } else {
            res.status(200).json({ message: 'Fetching job' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedJob = await Jobs.findByIdAndUpdate(id, req.body)
        if (updatedJob) {
            res.status(201).json(updatedJob)
        } else {
            res.status(200).json({ message: 'Updating job...' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteJob = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedJob = await Jobs.findByIdAndDelete(id)
        if (deletedJob) {
            res.status(201).json({ message: 'Job deleted successfully', data: deletedJob })
        } else {
            res.status(200).json({ message: 'Deleting job...' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getJobByRefId = async (req, res) => {
    try {
        const refId= req.params.refId;
        const jobs = await Jobs.find({ refId:refId },{_id:0});
        if(!jobs){
            return res.status(404).json({message: "Job not found"})
        }
        res.status(201).json(jobs)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = { createJob, getJobs, getJobsById, updateJob, deleteJob, getJobByRefId }