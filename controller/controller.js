const VolunteerModel = require("../models/volunteerModel");
const ClassroomModel = require("../models/classroomModel");

exports.register = async (req, res) => {
  try {
    const volunteer = new VolunteerModel(req.body);
    await volunteer.save();

    const registrationsCount = await VolunteerModel.countDocuments();
    if (registrationsCount === 20) {
      const classrooms = await ClassroomModel.find();
      const registrations = await VolunteerModel.find();
      const allocations = allocateVolunteers(classrooms, registrations);
      console.log("Allocations:", allocations);
    }
    res.status(201).json({ message: 'Volunteer registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await VolunteerModel.find();
    res.json(registrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.allocation = async (req, res) => {
  try {
    const classrooms = await ClassroomModel.find();
      const registrations = await VolunteerModel.find();
      const allocations = allocateVolunteers(classrooms, registrations);
      console.log("Allocations:", allocations);
      res.status(201).json({ message: 'Volunteer allocated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function allocateVolunteers(classrooms, registrations) {
  const allocations = [];

  for (const classroom of classrooms) {
    const matchingVolunteers = registrations.filter(volunteer =>
      volunteer.location === classroom.location &&
      volunteer.languages.some(language => classroom.languageRequirement.includes(language))
    );

    if (matchingVolunteers.length >= classroom.requirement) {
      const allocatedVolunteers = matchingVolunteers.splice(0, classroom.requirement);
      allocations.push({ classroomID: classroom.classroomID, volunteers: allocatedVolunteers });
    }
  }

  return allocations;
}
