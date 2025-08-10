import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
  },

  count: {
    type: Number,
    default: 1,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Issue = mongoose.model("Issue", issueSchema);
