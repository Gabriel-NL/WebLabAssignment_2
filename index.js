
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
const db_name = "Marketplace";
let connection;

// Define your MongoDB connection string
const MONGO_URL =
  "mongodb+srv://gabriellages2:test@mongotest.hokoz.mongodb.net/"; // Removed the "="

app.use(express.json());
// MongoDB connection using the defined URL
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
    dbName: db_name,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    connection = mongoose.connection;
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum:["Men", "Women", "Teens"], //This forces options
    unique: true, // Ensure categories are unique
  },
});

// Define a schema for the Product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Reference to the Category schema
    required: true,
  },
});

// Create models from the schemas
const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);

async function createCategory(categoryName) {
  const category = new Category({ name: categoryName });
  try {
    // Check if a value with the same name already exists in the database for the given model
    const existingValue = await Category.findOne({ name: category.name });

    if (!existingValue) {
      // If the value doesn't exist, save the new value
      const savedValue = await category.save();
      console.log(
        `Model: ${Category.modelName}, Name: ${category.name} saved:`,
        savedValue
      );
    } else {
      console.log(`Value already exists in ${Category.modelName}:`, existingValue);
      return existingValue; // Return the existing value instead of null
    }

    return category;
  } catch (error) {
    console.error("Error creating category:", error);
    return null;
  }
}

// Example function to create a product
async function createProduct(
  category_name,
  product_name,
  product_description,
  product_price,
  product_quantity
) {
  try {
    const search_for_repeated = await Product.findOne({ name: product_name });
    if (search_for_repeated) {
      console.log("Product Already exists");
      return null;
    } else {
      const product_category = await Category.findOne({ name: category_name });

      const newProduct = new Product({
        name: product_name,
        description: product_description,
        price: product_price,
        quantity: product_quantity,
        category: product_category._id, // Reference the category's ID
      });
      const savedProduct = await newProduct.save(); // Save to the collection
      console.log("Product created:", savedProduct);
      return savedProduct;
    }
  } catch (error) {
    console.error("Error creating category:", error);
  }
}

function PrintOnScreen(res,result){
    
    const responseMessage = {
        message: "Welcome to the dressStore application",
        savedValue: result || "No new value saved", // Default message if no new value was saved
      };
    res.json(responseMessage);
    
}

// Call the functions to create categories and a product

// Example route
app.get("/", async (req, res) => {
  //res.send("Welcome to the Online Market API!");

  var tag =createCategory("Men")
  var result = await createProduct(
    "Men",
    "Yellow Formal shirt",
    "product_description",
    199.99,
    10
  );
  console.log("result: ",result)
  PrintOnScreen(res, result)

  
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
