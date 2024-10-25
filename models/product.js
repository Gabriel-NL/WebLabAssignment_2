const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  price: Number,
  quantity: Number
});
module.exports = mongoose.model('Product', productSchema);
