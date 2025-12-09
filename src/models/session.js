const { Schema, model } = require('mongoose');

const sessionSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    from: {
      type: String,
      required: true,
      trim: true,
    },
    to: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
    lang: {
      type: String,
      default: 'zh',
      trim: true,
    },
    sentFlag: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    usedFlag: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model('Session', sessionSchema);

