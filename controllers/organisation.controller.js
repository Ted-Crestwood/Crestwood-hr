const Organisation = require("../models/organisation.model");

const createOrganisation = (req, res) => {
    try {
        const organisation = Organisation.create(req.body);
        if (organisation) {
            res.status(201).json({ message: `Organisation created successfully` })
        } else {
            res.status(404).json({ message: 'Organisation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllOrganisation = async (req, res) => {
    try {
        const organisation = await Organisation.find({});
        if (organisation) {
            res.status(201).json(organisation)
        } else {
            res.status(404).json({ message: 'Organisation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getOrganisationById = async (req, res) => {
    try {
        const { id } = req.params;
        const organisation = await Organisation.findById(id);
        if (organisation) {
            res.status(200).json(organisation)
        } else {
            res.status(404).json({ message: 'Organisation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateOrganisation = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrganisation = await Organisation.findByIdAndUpdate(id, req.body)
        console.log("updated organisation :", updatedOrganisation)
        if (updatedOrganisation) {
            res.status(201).json(updatedOrganisation)
        } else {
            res.status(200).json({ message: 'Updating organisation...' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const deleteOrganisation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrganisation = await Organisation.findByIdAndDelete(id)
        if (deletedOrganisation) {
            res.status(201).json({ message: 'Organisation deleted successfully' })
        } else {
            res.status(200).json({ message: 'Deleting organisation...' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = { createOrganisation, getAllOrganisation, getOrganisationById, updateOrganisation, deleteOrganisation }