const express = require("express");
const router = express.Router();

const { register, getRegistrations, allocation } = require("../controller/controller");

router.post("/register", register);
router.get("/registrations", getRegistrations);
router.post("/allocation", allocation);

module.exports = router;
