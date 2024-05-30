const Jobs = require("../models/jobs.model");
const User = require("../models/user.model");

const createJob = async (req, res) => {
    try {
        const { email, ...data } = req.body;
        const {title,location,salary,level,jobType,department,description,responsibilities,requirements,goToHave,organisation,deadline,createdOn,publishOn,extraInformation,
            paymentFormat,contractType,slug
        }= data
        const refId = generateRefId();
        const authToken = req.headers.authorization;
        const user = await User.findOne({ token: authToken })
        const userToken = user.token;
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        if (authToken !== userToken) {
            return res.status(403).json({ message: 'Unauthorized' })
        } else {
            const job = await Jobs.create({title,location,salary,level,jobType,department,description,responsibilities,requirements,goToHave,organisation,deadline,createdOn,publishOn,extraInformation,
                paymentFormat,contractType,slug, refId});
            if (job) {
                return res.status(201).json({ message: 'Job created' })
            } else {
                return res.status(404).json({ message: 'Job not created' })
            }
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
        const jobs = await Jobs.find({}, { _id: 0 });
        if (jobs) {
            return  res.status(201).json(jobs)
        } else {
            return  res.status(404).json({ message: 'Error fetching jobs...' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getJobsById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Jobs.findById(id)
        if (job) {
            return  res.status(201).json(job)
        } else {
            return res.status(200).json({ message: 'Fetching job' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedJob = await Jobs.findByIdAndUpdate(id, req.body)
        if (updatedJob) {
            return  res.status(201).json(updatedJob)
        } else {
            return res.status(200).json({ message: 'Updating job...' })
        }
    } catch (error) {
        return  res.status(500).json({ message: error.message })
    }
}

const deleteJob = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedJob = await Jobs.findByIdAndDelete(id)
        if (deletedJob) {
            return  res.status(201).json({ message: 'Job deleted successfully', data: deletedJob })
        } else {
            return  res.status(200).json({ message: 'Deleting job...' })
        }
    } catch (error) {
        return  res.status(500).json({ message: error.message })
    }
}

const getJobByRefId = async (req, res) => {
    try {
        const refId = req.params.refId;
        const jobs = await Jobs.find({ refId: refId }, { _id: 0 });
        if (!jobs) {
          return res.status(404).json({ message: "Job not found" })
        }
        return res.status(201).json(jobs)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = { createJob, getJobs, getJobsById, updateJob, deleteJob, getJobByRefId }