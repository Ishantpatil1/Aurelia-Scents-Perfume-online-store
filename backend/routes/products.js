const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Review = require('../models/Review');

function toAbsoluteImages(req, images){
  if (!images) return images
  return images.map(img => {
    if (!img) return img
    // if already absolute URL, return as-is
    if (img.startsWith('http://') || img.startsWith('https://')) return img
    // ensure leading slash
    const path = img.startsWith('/') ? img : '/' + img
    return `${req.protocol}://${req.get('host')}${path}`
  })
}

// GET /api/products - list all products
router.get('/', async (req, res) => {
  try {
    let products = await Product.find().select('name shortDescription price images');
    // log images for debugging
    console.log('[products] count=', products.length, 'images sample=', products.map(p=>p.images))
    // map images to absolute urls
    products = products.map(p => {
      const obj = p.toObject()
      obj.images = toAbsoluteImages(req, obj.images)
      return obj
    })
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// debug raw products (no URL conversion)
router.get('/raw/all', async (req, res) => {
  try{
    const products = await Product.find().lean();
    res.json(products);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id - get product detail with reviews
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const obj = product.toObject()
    obj.images = toAbsoluteImages(req, obj.images)
    res.json(obj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products/:id/reviews - add a review
router.post('/:id/reviews', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const { author, rating, comment } = req.body;
    const review = new Review({ author, rating, comment });
    await review.save();

    product.reviews.push(review._id);
    await product.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
