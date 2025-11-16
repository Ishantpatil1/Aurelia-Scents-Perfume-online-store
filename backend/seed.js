require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Product = require('./models/Product');
const Review = require('./models/Review');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/perfume_db';

const sampleProducts = [
  {
    name: 'Luminous Bloom',
    shortDescription: 'A fresh floral scent with citrus top notes.',
    description: 'Luminous Bloom is a delicate combination of jasmine, bergamot, and soft musk. Perfect for daytime wear.',
    price: 59.99,
    sizes: ['30ml', '50ml', '100ml'],
    images: ['/images/luminous1.png','/images/luminous2.png']
  },
  {
    name: 'Midnight Oud',
    shortDescription: 'Warm and woody, ideal for evenings.',
    description: 'Midnight Oud blends oud, amber, and patchouli for a long-lasting evening scent.',
    price: 89.99,
    sizes: ['50ml', '100ml'],
    images: ['/images/midnight1.png','/images/midnight2.png']
  },
  {
    name: 'Citrus Whisper',
    shortDescription: 'Bright citrus aroma with a clean finish.',
    description: 'Citrus Whisper is energetic and uplifting, with zesty lemon and grapefruit notes.',
    price: 49.99,
    sizes: ['30ml', '50ml'],
    images: ['/images/citrus1.png','/images/citrus2.png']
  },
  {
    name: 'Velvet Rose',
    shortDescription: 'Classic rose with modern vanilla undertones.',
    description: 'Velvet Rose reimagines the traditional rose fragrance with creamy vanilla and sandalwood.',
    price: 69.99,
    sizes: ['50ml', '100ml'],
    images: ['/images/velvet1.png','/images/velvet2.png']
  },
  {
    name: 'Ocean Drift',
    shortDescription: 'Marine notes with a subtle green heart.',
    description: 'Ocean Drift is airy and aquatic — perfect for summer days at sea.',
    price: 54.99,
    sizes: ['30ml', '50ml'],
    images: ['/images/ocean1.png','/images/ocean2.png']
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding');
    // clear collections
    await Product.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});

    // create a test user
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name: 'Test User', email: 'test@example.com', passwordHash: hash });
    await user.save();

    // create products with a sample review each
    for (const p of sampleProducts) {
      const product = new Product(p);
      const review = new Review({ author: 'Admin', rating: 5, comment: 'Beautiful scent!' });
      await review.save();
      product.reviews = [review._id];
      await product.save();
    }

    console.log('Seeding complete');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    try { await mongoose.disconnect(); } catch (e) {}
    process.exit(1);
  }
}

seed();
