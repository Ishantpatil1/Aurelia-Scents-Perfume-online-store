const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGO_URI;

async function run(){
  try{
    console.log('Connecting to', URI.replace(/(mongodb\+srv:\/\/[^:]+:)[^@]+(@)/, '$1<hidden>$2'))
    await mongoose.connect(URI, { useNewUrlParser:true, useUnifiedTopology:true, serverSelectionTimeoutMS:10000 });
    console.log('Connected to Atlas ✅');
    const db = mongoose.connection.db;
    const cols = await db.listCollections().toArray();
    console.log('Collections:', cols.map(c=>c.name));
    await mongoose.disconnect();
    console.log('Disconnected');
  }catch(err){
    console.error('Connection failed:', err.message || err);
    process.exitCode = 1;
  }
}

run();
