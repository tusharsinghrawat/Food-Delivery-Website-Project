const express = require("express");
const { addFood, getFoods } = require("../controllers/foodController");

const router = express.Router();

router.post("/add", addFood);
router.get("/", getFoods);

module.exports = router;
