const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      default: 0.0,
    },
    image: {
      type: String,
      required: [true, 'Please provide main product image'],
    },
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: [true, 'Please enter product description'],
    },
    category: {
      type: String,
      required: [true, 'Please select category for this product'],
      enum: {
        values: ['Tech', 'Clothing', 'Interior', 'Electronics', 'Mobile accessory'],
        message: 'Please select correct category',
      },
    },
    stock: {
      type: Number,
      required: [true, 'Please enter product stock'],
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    originalPrice: {
      type: Number,
    },
    specs: [
      {
        label: String,
        value: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
