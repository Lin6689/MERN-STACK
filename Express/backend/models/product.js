const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Category',
},
stock: {
  type: Number,
  default: 10,
},
  price: {
    type: Number,
    required: true,
  },
  // models/product.js
sizes: [{ type: String }],      // ["S","M","L","XL"]
discount: { type: Number, default: 0 }, // % off
  images: {
    type: [
      {
        url: String,
        public_id: String,
      },
    ],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);