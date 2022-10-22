const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: false,
    },
    lastVisit: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
