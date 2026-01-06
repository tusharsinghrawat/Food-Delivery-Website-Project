const Food = require("../models/Food");

// ===============================
// Add food
// ===============================
exports.addFood = async (req, res) => {
  try {
    const foodData = { ...req.body };

    // 🔒 PERMANENT IMAGE RULE:
    // Always store ONLY filename in DB
    if (foodData.image) {
      foodData.image = foodData.image.split("/").pop();
    }

    const food = await Food.create(foodData);
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// Get all foods
// ===============================
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find();

    // 🔒 PERMANENT IMAGE NORMALIZATION
    // Frontend will ALWAYS receive /images/xxx.jpg
    const normalizedFoods = foods.map((food) => {
      const foodObj = food.toObject();

      if (foodObj.image) {
        const fileName = foodObj.image.split("/").pop();
        foodObj.image = `/images/${fileName}`;
      }

      return foodObj;
    });

    res.json(normalizedFoods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
