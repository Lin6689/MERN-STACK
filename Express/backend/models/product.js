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
  price: {
    type: Number,
    required: true,
  },
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