const Organisation = require("../models/organisation.model");

const createOrganisation = (req, res) => {
    try {
        const refId = generateRefId()
        const organisationData = {...req.body, refId}
        const organisation = Organisation.create(organisationData);
        if (organisation) {
            return  res.status(201).json({ message: `Organisation created successfully` })
        } else {
            return  res.status(404).json({ message: 'Organisation not found' });
        }
    } catch (error) {
        return  res.status(500).json({ message: error.message })
    }
}
function generateRefId(){
    return 'CRT'+Date.now().toString(36)+Math.random().toString(36).substring(2,5);
}
const getAllOrganisation = async (req, res) => {
    try {
        const organisation = await Organisation.find({});
        if (organisation) {
            return  res.status(201).json(organisation)
        } else {
            return   res.status(404).json({ message: 'Organisation not found' });
        }
    } catch (error) {
        return  res.status(500).json({ message: error.message })
    }
}

const getOrganisationById = async (req, res) => {
    try {
        const { id } = req.params;
        const organisation = await Organisation.findById(id,{_id:0});
        if (organisation) {
            return  res.status(200).json(organisation)
        } else {
            return   res.status(404).json({ message: 'Organisation not found' });
        }
    } catch (error) {
        return  res.status(500).json({ message: error.message })
    }
}

const updateOrganisation = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrganisation = await Organisation.findByIdAndUpdate(id, req.body)
        if (updatedOrganisation) {
            return   res.status(201).json(updatedOrganisation)
        } else {
            return  res.status(200).json({ message: 'Updating organisation...' })
        }
    } catch (error) {
        return  res.status(500).json({ message: error.message })
    }
}
const deleteOrganisation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrganisation = await Organisation.findByIdAndDelete(id)
        if (deletedOrganisation) {
            return  res.status(201).json({ message: 'Organisation deleted successfully' })
        } else {
            return   res.status(200).json({ message: 'Deleting organisation...' })
        }
    } catch (error) {
        return  res.status(500).json({ message: error.message })
    }
}
const getOrganisationByRefId = async (req, res) => {
    try {
        const refId= req.params.refId;
        const organisation = await Organisation.find({ refId:refId },{_id:0});
        if(!organisation){
            return res.status(404).json({message: "Organisation not found"})
        }
        return res.status(201).json(organisation)
    } catch (error) {
        return  res.status(500).json({ message: error.message })
    }
}
module.exports = { createOrganisation, getAllOrganisation, getOrganisationById, updateOrganisation, deleteOrganisation,getOrganisationByRefId }