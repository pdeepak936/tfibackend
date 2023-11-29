const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  classroomID: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  requirement: {
    type: Number,
    required: true,
  },
  subjects: {
    type: [String],
    required: [],
  },
  languageRequirement: {
    type: [String],
    default: [],
  },
  location: {
    type: String,
    required: true,
  },
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;