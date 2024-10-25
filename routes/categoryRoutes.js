const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/categories', categoryController.createCategory); // Create category
router.get('/categories', categoryController.getCategories);   // Get all categories

module.exports = router;
