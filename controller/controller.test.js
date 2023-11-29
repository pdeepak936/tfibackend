const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Volunteer Controller', () => {
  it('should register a volunteer successfully', async () => {
    const response = await chai
      .request(server)
      .post('/api/volunteer/register')
      .send({
        name: 'Deepak Pal',
        contactInformation: 'pdeepak936@gmail.com',
        location: 'Kanpur',
        spokenLanguages: ['English', 'Hindi'],
        availability: ['Saturday', 'Sunday'],
      });

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('message').equal('Volunteer registered successfully');
  });

  it('should get a list of registrations', async () => {
    const response = await chai.request(app).get('/api/volunteer/registrations');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
  });

  it('should handle invalid input during registration', async () => {
    const response = await chai
      .request(server)
      .post('/api/volunteer/register')
      .send({
        // Incomplete volunteer information
        name: 'Incomplete Volunteer',
      });

    expect(response).to.have.status(500);
    expect(response.body).to.have.property('message').equal('Internal Server Error');
  });

  it('should handle duplicate registrations', async () => {
    await chai
      .request(server)
      .post('/api/volunteer/register')
      .send({
        name: 'Deepak Pal',
        contactInformation: 'pdeepak936@gmail.com',
        location: 'Kanpur',
        spokenLanguages: ['English', 'Hindi'],
        availability: ['Saturday', 'Sunday'],
      });

    // Attempt to register the same volunteer again
    const response = await chai
      .request(server)
      .post('/api/volunteer/register')
      .send({
        name: 'Deepak Pal',
        contactInformation: 'pdeepak936@gmail.com',
        location: 'Kanpur',
        spokenLanguages: ['English', 'Hindi'],
        availability: ['Saturday', 'Sunday'],
      });

    expect(response).to.have.status(500); // Assuming you return 500 for internal server errors
    expect(response.body).to.have.property('message').equal('Internal Server Error');
  });

  it('should initiate allocation process when 20 registrations are received', async () => {
    // Register 20 volunteers
    for (let i = 0; i < 20; i++) {
      await chai
        .request(app)
        .post('/api/volunteer/register')
        .send({
          name: `Volunteer ${i + 1}`,
          contactInformation: `volunteer${i + 1}@gmail.com`,
          location: 'kanpur',
          spokenLanguages: ['English'],
          availability: ['Saturday', 'Sunday'],
        });
    }

    // Check if the allocation process is triggered
    const response = await chai.request(app).get('/api/volunteer/registrations');
    const registrations = response.body;

    expect(response).to.have.status(200);
    expect(registrations).to.be.an('array');
    expect(registrations.length).to.equal(0);
  });
});
