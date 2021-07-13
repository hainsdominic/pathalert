const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env variables
dotenv.config({ path: './config/config.env' });

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('MongoDB Connected'.cyan.bold);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
