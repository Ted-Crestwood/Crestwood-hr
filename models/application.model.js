const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new mongoose.Schema({
  userData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobs',
    required: true
  },
  user: {
    firstName: { type: String },
    lastName: { type: String },
    surname: { type: String },
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    designation: { type: String },
    organization: { type: String },
    dateOfBirth: { type: String },
    address: { type: String },
    nationality: { type: String },
    education: [
      {
        level: { type: String },
        institution: { type: String },
        specialization: { type: String },
        startDate: { type: String },
        endDate: { type: String },
      },
    ],
    yearsOfExperience: { type: Number, default: null },
    certifications: [
      {
        name: { type: String },
        institution: { type: String },
        date: { type: String },
      }
    ],
    workHistory: [
      {
        institution: { type: String },
        role: { type: String },
        description: { type: String },
        joined: { type: String },
        left: { type: String },
      }
    ],
    referees: [
      {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        designation: { type: String },
        organization: { type: String },
      },
    ],
    memberships: [
      {
        institution: { type: String },
        date: { type: String },
      }
    ],
    cv: { type: String },
    coverLetter: { type: String },
    documents: { type: Array },

  },
}, {
  timestamps: true,
});

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;
