const {Schema, model} = require('mongoose');

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
        amountOwed: {
            type: Number,
            required: true
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

rescueSchema.virtual('supportersCount').get(function() {
    // if user (with or without an account) supports this rescue, +1
});

const Rescues = model('Rescues', rescueSchema);

module.exports = Rescues;