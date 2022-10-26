const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'field nama harus ada'],
    minLength: 3,
    maxLength: 50
  },
  price: {
    type: Number,
    required: [true, 'field price harus ada'],
    min: 1000,
    max: 1000000000
  },
  stock: {
    type: Number,
    require: [true, 'field stock harus ada'],
    min: 1,
    max: 9999
  }, 
  status: {
    type: Boolean,
    default: true
  },
  image_url:{
    type: String
  }
});

const Product = mongoose.model('Product-mongoose', productSchema);
module.exports = Product;