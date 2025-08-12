const mongoose = require('mongoose');

const StandupSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  yesterday: {
    type: String,
    required: true,
  },
  today: {
    type: String,
    required: true,
  },
  blockers: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Standup', StandupSchema);