const mongoose = require('mongoose');
const fs = require('fs');
const Classroom = require('./models/classroomModel');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const rawData = fs.readFileSync('classrooms-web-dev-pre-work.json');
const classroomsData = JSON.parse(rawData);

async function uploadData() {
  try {
    await Classroom.deleteMany();
    await Classroom.insertMany(classroomsData);
    console.log('Data uploaded successfully.');
  } catch (error) {
    console.error('Error uploading data:', error);
  } finally {
    mongoose.disconnect();
  }
}

uploadData();
