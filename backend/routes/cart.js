const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const Order = require('../models/Order');

function auth(req, res, next){
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
  const token = authHeader.replace('Bearer ', '');
  try{
    const data = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.userId = data.id;
    next();
  }catch(e){
    res.status(401).json({ error: 'Invalid token' });
  }
}

// POST /api/cart/checkout - create an order
router.post('/checkout', auth, async (req, res) => {
  try{
    const { items } = req.body; // [{product, size, qty}]
    if (!items || !items.length) return res.status(400).json({ error: 'No items' });

    const populated = [];
    let total = 0;
    for (const it of items){
      const p = await Product.findById(it.product);
      if (!p) return res.status(400).json({ error: 'Product not found' });
      const price = p.price;
      total += price * (it.qty||1);
      populated.push({ product: p._id, size: it.size, qty: it.qty||1, price });
    }

    const order = new Order({ user: req.userId, items: populated, total });
    await order.save();
    res.json(order);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

// GET /api/cart/orders - list orders for user
router.get('/orders', auth, async (req, res) => {
  try{
    const orders = await Order.find({ user: req.userId }).populate('items.product');
    res.json(orders);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
