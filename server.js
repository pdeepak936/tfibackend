const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 6000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Successfully Connected'))
    .catch(err => console.log(err));

const volunteerRoutes = require('./routes/volunteerRoutes');
const adminRout = require('./routes/adminRoute')
app.use('/api/volunteer', volunteerRoutes);
app.use('/admin', adminRout)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});