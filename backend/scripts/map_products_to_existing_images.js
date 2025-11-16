require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/perfume_db';
const imagesDir = path.join(__dirname, '..', 'public', 'images');

function basenameKey(filename){
  // remove extension and numbers/hyphens
  return filename.replace(/\.[^.]+$/, '').replace(/[-_]/g,'').replace(/\d+/g,'').toLowerCase();
}

async function run(){
  await mongoose.connect(MONGO_URI);
  const files = fs.readdirSync(imagesDir).filter(f=>!f.startsWith('.'));
  const groups = {}; // key -> [files]
  for (const f of files){
    const key = basenameKey(f);
    groups[key] = groups[key] || [];
    groups[key].push(f);
  }
  console.log('Groups found:', groups);

  const products = await Product.find();
  for (const p of products){
    const nameKey = p.name.replace(/[^a-zA-Z]/g,'').toLowerCase();
    // find group that is substring of nameKey or vice versa
    let matched = null;
    for (const k of Object.keys(groups)){
      if (nameKey.includes(k) || k.includes(nameKey) ) { matched = k; break }
    }
    if (!matched){
      // try contains first word
      const first = p.name.split(/\s+/)[0].replace(/[^a-zA-Z]/g,'').toLowerCase();
      for (const k of Object.keys(groups)){
        if (k.includes(first) || first.includes(k)){ matched = k; break }
      }
    }
    if (matched){
      const imgs = groups[matched].map(f => '/images/' + f).slice(0,2);
      console.log('Setting', p.name, '->', imgs);
      p.images = imgs;
      await p.save();
    } else {
      console.log('No match for', p.name);
    }
  }
  await mongoose.disconnect();
  console.log('Done');
}

run().catch(err=>{ console.error(err); process.exit(1) });
