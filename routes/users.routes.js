const express = require('express');
const router = express.Router();
const axios = require('axios').default;

const User = require('../models/user.model');
const Item = require('../models/item.model');

const getUser = async (req, populate) => {
  try {
    const userEmail = req.user['https://shop.com/email'];
    const userName = req.user['https://shop.com/name'];
    let user;
    if (populate) {
      user = await User.findOne({ email: userEmail }).populate(
        'shoppingCart.items.item'
      );
    } else {
      user = await User.findOne({ email: userEmail });
    }
    if (!user) {
      user = new User({ name: userName, email: userEmail });
      await user.save();
    }
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

router.get('/user', async (req, res) => {
  try {
    const user = await getUser(req, (populate = true));
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/user/cart', async (req, res) => {
  try {
    const user = await getUser(req);
    const item = await Item.findById(req.body._id);
    if (item) {
      const index = user.shoppingCart.items.findIndex(
        (item) => item.item == req.body._id
      );
      if (index === -1) {
        user.shoppingCart.items.push({
          item: req.body._id,
          quantity: req.body.quantity,
        });
      } else {
        user.shoppingCart.items[index].quantity += req.body.quantity;
      }
      await user.save();
      res.json({ message: 'Success' });
    } else {
      res.json({ message: 'Item not found...' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
