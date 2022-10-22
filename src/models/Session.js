const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    token: { type: String, unique: true, required: true },
    lastVisit: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

sessionSchema.path('lastVisit').index({ expires: 60000 });

module.exports = mongoose.model('Session', sessionSchema);
