const { Schema, model } = require('mongoose');

const rescueSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        website: {
            type: String,
            required: false
        },
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

const Rescues = model('Rescues', rescueSchema);

module.exports = Rescues;