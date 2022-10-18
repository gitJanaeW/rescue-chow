const {Schema, models} = require('mongoose');

const billingSchema = new Schema(
    {
        country: {
            type: String,
            required: true,
            match: [/(Canada|United States (US))/, "We do not ship to this country/region"]
        },
        street: {
            type: String,
            required: true,
            trim: true
        },
        apartment: {
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        provinceState: {
            type: String,
            required: true,
            trim: true
        },
        postalZip: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            match: [/([0-9]{10})/, "Please enter digits only"]
        },
        note: {
            type: String
        }
    },
    {
        toJSON: {}
    }
);

module.exports = billingSchema;