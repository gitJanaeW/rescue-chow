const { Schema, Types } = require('mongoose');
const moment = require('moment');
// const dateFormat = require('../../utils/helpers');

const thoughtSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => Types.ObjectId()
    },
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // get: timestamp => dateFormat(timestamp)
      get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
    },
    username:
    {
      type: String,
      required: true
    },
    rating: {
      type: Number
    },
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

module.exports = thoughtSchema; 
