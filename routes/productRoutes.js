const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create product
router.post('/products', productController.createProduct);

// Get all products
router.get('/products', productController.getProducts);

// Get a product by ID
router.get('/products/:id', productController.getProductById);

// Update a product by ID
router.put('/products/:id', productController.updateProductById);

// Delete all products
router.delete('/products', productController.deleteAllProducts);

// Delete a product by ID
router.delete('/products/:id', productController.deleteProductById);

// Delete products by name
router.get('/products', productController.findProductsByName);

module.exports = router;
