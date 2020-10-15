const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  wishList: [{ type: String, default: [] }],
  shoppingCart: {
    items: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        quantity: { type: Number },
      },
    ],
    value: { type: Number },
  },
  orders: [
    {
      items: [
        {
          item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
          quantity: { type: Number },
        },
      ],
      value: { type: Number },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
