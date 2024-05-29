const mongoose = require("mongoose");

const ShortlistSchema = new mongoose.Schema({
  person: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    surName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    idNumber: {
      type: Number,
      required: true,
    },
    idImg: {
      type: Buffer,
      contentType: String
    },
    homeCounty: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    ethnicity: {
      type: String,
      required: true,
    },
    disability: {
      type: Boolean,
      required: true,
    },
    contact: {
      email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
      },
      mobile: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      }
    },
    academic: [{
      level: {
        type: String,
        required: true,
      },
      course: {
        type: String,
        required: true,
      },
      institution: {
        type: String,
        required: true,
      },
      graduation: {
        type: Date,
        required: true,
      },
      pdf: {
        type: Buffer,
        contentType: String
      }
    }],
    employment: [{
      organisation: {
        type: String,
        required: true,
      },
      destination: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      working: {
        type: Boolean,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      description: {
        type: String,
        required: true,
      }
    }],
    professional: [{
      name: {
        type: String,
        required: true,
      },
      institution: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      pdf: {
        type: Buffer,
        contentType: String
      }
    }],
    shortCourses: [{
      course: {
        type: String,
        required: true,
      },
      institution: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      pdf: {
        type: Buffer,
        contentType: String
      }
    }],
    membership: [{
      institution: {
        type: String,
        required: true,
      },
      membership: {
        type: String,
        required: true,
      },
      birthDate: {
        type: Date,
        required: true,
      },
      pdf: {
        type: Buffer,
        contentType: String
      }
    }],
    referees: [{
      name: {
        type: String,
        required: true,
      },
      destination: {
        type: String,
        required: true,
      },
      employer: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      mobile: {
        type: Number,
        required: true,
      }
    }],
    coverLetter: {
      pdf: {
        type: Buffer,
        contentType: String
      }
    },
    refId: { type: String, unique: true }
  },
}, {
  timestamps: true,
});

const Shortlist = mongoose.model("Shortlist", ShortlistSchema);
module.exports = Shortlist;
