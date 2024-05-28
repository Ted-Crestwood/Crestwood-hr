const Application = require("../models/application.model");
const Shortlist = require("../models/shortlist.model");

const createShortlst = async (req, res) => {
    const shortlist = await Shortlist.create(req.body)
    console.log("shortlist :", shortlist)
    try {
        const addedShortlist = await Shortlist.create(shortlist)
        if (addedShortlist) {
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
        if(shortlist){
            res.status(201).json(shortlist)
        }else{
            res.status(200).json({message: "Fetching shortlist candidates..."})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}


module.exports = { createShortlst, getShortlist ,getShortlistById}