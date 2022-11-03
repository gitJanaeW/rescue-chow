const { Schema, Types } = require('mongoose');

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
      default: Date.now
    },
    username:
    {
      type: String,
      required: true
    }

  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

module.exports = thoughtSchema; 
