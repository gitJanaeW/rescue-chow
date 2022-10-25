const {Schema, model} = require('mongoose');
const {dateFormat} = require('../utils/helpers');

const treatSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        petType: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        // this would be used to keep track of new-ness of the product for filter functionality (beyondMVP)
        createdAt: {
            type: Date,
            deault: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

const Treats = model('Treats', treatSchema);

module.exports = Treats;