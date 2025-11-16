require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/perfume_db';

async function run(){
  await mongoose.connect(MONGO_URI);
  const products = await Product.find().lean();
  console.log(JSON.stringify(products.map(p=>({ _id: p._id, name: p.name, images: p.images })), null, 2));
  await mongoose.disconnect();
}

run().catch(err=>{ console.error(err); process.exit(1) });
