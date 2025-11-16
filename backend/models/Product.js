const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDescription: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  sizes: [{ type: String }],
  images: [{ type: String }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Product', productSchema);
