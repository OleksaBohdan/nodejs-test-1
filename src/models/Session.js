const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    token: { type: String, unique: true, required: true },
    lastVisit: { type: Date, required: true },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
  },
  {
    timestamps: true,
  }
);

sessionSchema.path('lastVisit').index({ expires: 60 });

module.exports = mongoose.model('Session', sessionSchema);
