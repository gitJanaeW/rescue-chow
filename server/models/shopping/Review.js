const { Schema, model } = require('mongoose');
const reviewSchema = require('./Review');
const dateFormat = require('../utils/helpers');

const reviewSchema = new Schema(
    {
        reviewText: {
            type: String,
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