const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getDashboardData } = require("../controllers/dashboardController");

const router = express.Router();

// Define your dashboard routes here
router.get("/", protect, getDashboardData);

module.exports = router;
