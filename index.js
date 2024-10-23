require('dotenv').config(); // Load .env file

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const db_name='myDatabase'
let connection;

// Define your MongoDB connection string
const MONGO_URL = "mongodb+srv://gabriellages2:test@mongotest.hokoz.mongodb.net/"; // Removed the "="

// Middleware
app.use(express.json());

// MongoDB connection using the defined URL
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: db_name // You can still specify the database name here if needed
}).then(() => {
    console.log('Connected to MongoDB');
    connection=mongoose.connection;
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        enum: ['Men', 'Women', 'Teens'], // Specify valid categories
        unique: true // Ensure categories are unique
    }
});

// Define a schema for the Product
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', // Reference to the Category schema
        required: true 
    }
});


// Create models from the schemas
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

// Example function to create categories
async function createCategories() {
    const categories = ['Men', 'Women', 'Teens'];

    for (const categoryName of categories) {
        const category = new Category({ name: categoryName });
        try {
            const savedCategory = await category.save();
            console.log('Category created:', savedCategory);
        } catch (error) {
            console.error('Error creating category:', error);
        }
    }
}

// Example function to create a product
async function createProduct() {
    const sampleCategory = await Category.findOne({ name: 'Men' }); // Assuming you want to link to an existing category
    const newProduct = new Product({
        name: 'Sample Product',
        description: 'This is a sample product description.',
        price: 19.99,
        quantity: 100,
        category: sampleCategory._id // Reference the category's ID
    });

    try {
        const savedProduct = await newProduct.save(); // Save to the collection
        console.log('Product created:', savedProduct);
    } catch (error) {
        console.error('Error creating product:', error);
    }
}


// Call the functions to create categories and a product


async function CheckExistance(){
    // Check if the 'categories' collection exists
    const collections = await connection.db.listCollections().toArray();
    const collectionExists = collections.some(col => col.name === 'categories');

    if (collectionExists) {
        console.log(`The collection 'categories' already exists in the database '${db_name}'.`);
    } else {
        console.log(`The collection 'categories' does not exist in the database '${db_name}'. Creating...`);
        console.log(`The collection 'categories' does not exist in the database '${db_name}'. Creating...`);

        createCategories();
        createProduct();
        // Example: Create a new category to ensure the collection is created

        console.log(`The collection 'categories' has been created in the database '${db_name}'.`);
    }
}


// Example route
app.get('/', async (req, res) => {
    res.send('Welcome to the Online Market API!');
    CheckExistance();
    
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
