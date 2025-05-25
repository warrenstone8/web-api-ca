import mongoose from 'mongoose';

const initDb = (mongoUri) => {
  if (!mongoUri) {
    console.error("❌ MONGO_DB URI is missing. Cannot connect to database.");

    return; 
  }

  mongoose.connect(mongoUri)
    .then(() => {
      console.log(`✅ Database connected to ${mongoose.connection.db.databaseName} on ${mongoose.connection.host}`);
    })
    .catch(err => {
      console.error(`❌ Database connection error: ${err.message}`);
      
    });

  
  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error(`🔴 Database runtime error: ${err}`);
  });

  
};

export default initDb; 
