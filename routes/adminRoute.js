const express = require('express');
const adminController = require('../controller/adminController');
const volunteerRoutes = require('./volunteerRoutes');

const router = express.Router();

router.post('/login', adminController.login);
router.use('/volunteer', authenticateAdmin, volunteerRoutes);

function authenticateAdmin(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const jwt = require('jsonwebtoken');
    const secretKey = process.env.SECRET_KEY;
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // Attach the decoded adminId to the request for further processing
      req.adminId = decoded.adminId;
      next();
    });
  }
  
  

module.exports = router;
