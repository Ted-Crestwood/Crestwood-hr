const Application = require("../models/application.model");
const Shortlist = require("../models/shortlist.model");

const createShortlst = async (req, res) => {
    try {
        const refId = generateRefId()
        const shortlistData = {...req.body, refId}
        const shortlist = await Shortlist.create(shortlistData)
        const addedShortlist = await Shortlist.create(shortlist)
        if (addedShortlist ) {
            return res.status(201).json({ message: "Applicant added to shortlist successfully" })
        } else {
            return  res.status(200).json({ message: "Adding applicant to shortlist" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
function generateRefId(){
    return 'CRT'+Date.now().toString(36)+Math.random().toString(36).substring(2,5);
}
const getShortlist = async (req, res) => {
    try {
        const shortlist = await Shortlist.find({})
        if (shortlist) {
            return  res.status(201).json(shortlist)
        } else {
            return  res.status(200).json({ message: "Fetching shortlist..." })
        }
    } catch (error) {
        return  res.status(500).json({ message: error.message })
    }
}

const getShortlistById = async (req, res) => {
    try {
        const { id } = req.params;
        const shortlist = await Shortlist.findById(id);
        if (shortlist) {
            return   res.status(201).json(shortlist)
        } else {
            return res.status(200).json({ message: "Fetching shortlist candidates..." })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

const updateShortlist = async(req,res)=>{
    try {
        const {id} = req.params;
        const updatedShortlist = await Shortlist.findByIdAndUpdate(id, req.body);
        if(updatedShortlist){
            return  res.status(201).json({message: 'Candidate shortlist updated successfully'})
        }else{
            return  res.status(200).json({message: 'Updating shortlist...'})
        }
    } catch (error) {
        return  res.status(500).json({message: error.message})
    }
}

const deleteShortlist= async(req,res)=>{
    try {
        const {id} = req.params;
        const deletedShortlist = await Shortlist.findByIdAndDelete(id);
        if(deletedShortlist){
            return  res.status(201).json({message: 'Candidate deleted successfully'})
        }else{
            return  res.status(200).json({message: 'Deleting candidate...'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
module.exports = { createShortlst, getShortlist, getShortlistById , updateShortlist,deleteShortlist}