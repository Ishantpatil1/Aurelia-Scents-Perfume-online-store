require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/perfume_db';

async function run(){
  await mongoose.connect(MONGO_URI);
  const products = await Product.find();
  for (const p of products){
    let changed = false;
    p.images = (p.images||[]).map(img => {
      if (!img) return img;
      if (img.endsWith('.jpg')){ changed = true; return img.replace(/\.jpg$/i, '.svg') }
      return img;
    });
    if (changed){
      console.log('Updating', p.name, '->', p.images)
      await p.save();
    }
  }
  await mongoose.disconnect();
  console.log('Done')
}

run().catch(err=>{ console.error(err); process.exit(1) });
