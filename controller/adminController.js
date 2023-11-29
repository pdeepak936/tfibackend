// Admin Controller
const AdminModel = require("../models/adminModel");

exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await AdminModel.findOne({ username, password });
  
      if (admin) {
        const token = generateToken(admin);
        res.json({ message: 'Admin login successful', token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  function generateToken(admin) {
    const jwt = require('jsonwebtoken');
    const secretKey = process.env.SECRET_KEY;
    return jwt.sign({ adminId: admin._id }, secretKey);
  }
