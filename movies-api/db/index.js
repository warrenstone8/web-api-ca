import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGO_DB);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(`database connection error: ${err}`);
});

db.once('open', () => {
  console.log(`database connected to ${db.name} on ${db.host}`);
});
