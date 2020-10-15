const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  price: {
    value: { type: Number },
    currency: { type: String },
  },
  images: [{ type: String }],
});

module.exports = mongoose.model('Item', itemSchema);
