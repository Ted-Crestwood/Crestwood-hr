const { Schema, model } = require("mongoose");

const organisationSchema = new Schema({
    organisationName: { type: String},
    email: { type: String  },
    phone: { type: String  },
    logo: {
        type: Buffer,
        contentType: String
    },
    description: { type: String }
})

const Organisation = model("Organisation", organisationSchema)
module.exports = Organisation;