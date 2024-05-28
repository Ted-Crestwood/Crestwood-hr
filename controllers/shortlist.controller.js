const Application = require("../models/application.model");
const Shortlist = require("../models/shortlist.model");

const createShortlst = async (req, res) => {
    const shortlist = await Shortlist.create(req.body)
    try {
        const addedShortlist = await Shortlist.create(shortlist)
        if (addedShortlist ) {
            res.status(201).json({ message: "Applicant added to shortlist successfully" })
        } else {
            res.status(200).json({ message: "Adding applicant to shortlist" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getShortlist = async (req, res) => {
    try {
        const shortlist = await Shortlist.find({})
        if (shortlist) {
            res.status(201).json(shortlist)
        } else {
            res.status(200).json({ message: "Fetching shortlist..." })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getShortlistById = async (req, res) => {
    try {
        const { id } = req.params;
        const shortlist = await Shortlist.findById(id);
        if (shortlist) {
            res.status(201).json(shortlist)
        } else {
            res.status(200).json({ message: "Fetching shortlist candidates..." })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const updateShortlist = async(req,res)=>{
    try {
        const {id} = req.params;
        const updatedShortlist = await Shortlist.findByIdAndUpdate(id, req.body);
        if(updatedShortlist){
            res.status(201).json({message: 'Candidate shortlist updated successfully'})
        }else{
            res.status(200).json({message: 'Updating shortlist...'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteShortlist= async(req,res)=>{
    try {
        const {id} = req.params;
        const deletedShortlist = await Shortlist.findByIdAndDelete(id);
        if(deletedShortlist){
            res.status(201).json({message: 'Candidate deleted successfully'})
        }else{
            res.status(200).json({message: 'Deleting candidate...'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
module.exports = { createShortlst, getShortlist, getShortlistById , updateShortlist,deleteShortlist}