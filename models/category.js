const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  name: { type: String, enum: ['Men', 'Women', 'Teens'], required: true }
});
module.exports = mongoose.model('Category', categorySchema);
