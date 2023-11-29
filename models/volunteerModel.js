const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
    contact: {
        type: String,
        required: true,
      },
    location: {
        type: String,
        required: true,
      },
    languages: {
        type: [String],
        required: true,
      },
    availability: {
        type: [String],
        required: true,
      },
  });
  
const VolunteerModel = mongoose.model('Volunteer', volunteerSchema);
module.exports = VolunteerModel;