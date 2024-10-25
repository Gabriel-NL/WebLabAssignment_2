const Category = require('../models/category');

exports.createCategory = async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};

// Implement update and delete as needed
