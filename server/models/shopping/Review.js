const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema(
    {
        reviewText: {
            type: String,
            required: 'You need to leave a thought!',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
    },
    {
        toJSON: {
            getters: true
        }
    }
);

reviewSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Review = model('Review', reviewSchema);

module.exports = Review;