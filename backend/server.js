require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

console.log('Attempting MongoDB connection...')
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // fail fast if cannot connect
  socketTimeoutMS: 45000,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

mongoose.connection.on('connected', () => console.log('Mongoose event: connected'))
mongoose.connection.on('error', err => console.error('Mongoose event: error', err))
mongoose.connection.on('disconnected', () => console.warn('Mongoose event: disconnected'))

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

// serve static images
app.use('/images', express.static(require('path').join(__dirname, 'public', 'images')));

app.get('/', (req, res) => res.send({ status: 'Perfumora API running' }));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
