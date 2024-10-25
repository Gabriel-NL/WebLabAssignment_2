const express = require('express');
const mongoose = require('mongoose');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

const db_name = "Marketplace";
const port = 3000;
const MONGO_URL =
  "mongodb+srv://gabriellages2:test@mongotest.hokoz.mongodb.net/";

// Connect to MongoDB
mongoose.connect(MONGO_URL, { dbName: db_name, serverSelectionTimeoutMS: 20000 })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

app.get("/", async (req, res) => {

  const responseMessage = {
    message: "Welcome to the DressStore application"
  };
  res.json(responseMessage);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
