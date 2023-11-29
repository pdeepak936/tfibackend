const express = require("express");
const router = express.Router();

const { register, getRegistrations } = require("../controller/controller");

router.post("/register", register);
router.get("/registrations", getRegistrations);

module.exports = router;