const express = require("express");

const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} = require("../controllers/inncomeController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get-all", protect, getAllIncome);
router.get("/download-excel", protect, downloadIncomeExcel);
router.delete("/delete/:id", protect, deleteIncome);

module.exports = router;
